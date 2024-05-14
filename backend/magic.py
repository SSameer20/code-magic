import google.generativeai as genai
genai.configure(api_key="AIzaSyB3ic-kIZbrrVPusD4FKYsQnOOyZ_FbrHA")

from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)

@app.route('/magic', methods=['POST'])
def magic():
    code = request.json.get('code')
    code_ouput = generate(code)
    return jsonify({'code_ouput':code})




# setting up the configuration of the model
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

# setting up the saftey configuration for the input given by the user 
safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

# instatiating the  model into a variable
model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

# previous demo history of the model while setting up the api-key
convo = model.start_chat(history=[
  {
    "role": "user",
    "parts": ["hello"]
  },
  {
    "role": "model",
    "parts": ["Hello, how can I assist you today?"]
  },
])


# function used to correct the given code with errors 
def generate(input_code):
    convo.send_message(input_code + """\n Strictly dont provide any kind of extra tokens or text(dont mention the language or provide inverted commas).
                       Just correct the above code and show the whole corrected code.
                       Dont provide any description. if the code has no errors just output the same code.""")
    return convo.last.text

# call for the main method
if __name__ == "__main__":
    app.run(debug=True,port=5001)