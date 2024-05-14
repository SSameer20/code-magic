// This is a C++ program that sorts an array in ascending order using the Bubble Sort algorithm
#include <iostream> // Include the necessary header file for input and output operations

int main() { // Define the main function
  int arr[] = {64, 34, 25, 12, 22, 11, 90}; // Initialize an array of integers
  int n = sizeof(arr) / sizeof(arr[0]); // Calculate the size of the array
  for (int i = 0; i < n; i++) { // Iterate over the array
    for (int j = 0; j < n - i - 1; j++) { // Iterate over the remaining elements in the array
      if (arr[j] > arr[j + 1]) { // Compare the current element with the next element
        int temp = arr[j]; // Store the current element in a temporary variable
        arr[j] = arr[j + 1]; // Swap the current element with the next element
        arr[j + 1] = temp; // Store the temporary variable in the next element
      }
    }
  }
  for (int i = 0; i < n; i++) { // Iterate over the sorted array
    std::cout << arr[i] << " "; // Print the sorted array
  }
  std::cout << std::endl; // Print a newline character
  return 0; // Return 0 to indicate successful execution
}