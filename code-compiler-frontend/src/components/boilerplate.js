const boilerplateMap = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  php: `<?php
echo "Hello, World!";
?>`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  go: `package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  ruby: `puts "Hello, World!"`,
  rust: `fn main() {
    println!("Hello, World!");
}`,
  swift: `import Swift

print("Hello, World!")`,
  typescript: `console.log("Hello, World!");`,
  kotlin: `fun main() {
    println("Hello, World!")
}`
};

export default boilerplateMap;
