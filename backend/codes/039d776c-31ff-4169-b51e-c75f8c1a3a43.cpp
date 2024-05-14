#include <iostream>
#include <algorithm>
using namespace std;
void bubbleSort(int arr[], int n) {
  bool swapped;
  do {
    swapped = false;
    for (int i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr[i], arr[i + 1]);
        swapped = true;
      }
    }
  } while (swapped);
}

int main() {
  int arr[] = {1, 5, 2, 4, 3};
  int n = sizeof(arr) / sizeof(arr[0]);

  bubbleSort(arr, n);

  for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
  }

  return 0;
}