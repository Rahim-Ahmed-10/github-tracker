
<!-- Help for Gemini -->

1️⃣ What is the difference between var, let, and const?

ANS:These are keywords used to declare variables in Javascript:
    * var : It is Function-scoped and can be redeclared or updated. It also supports hoisting, meaning you can access it before it is defined.
    * let : It is block scoped. (Lives only inside {}).You can update the value but cannot redeclare it in the same scope.
    * const : It is also Block scoped .Once a value is assigned to a Const variable ,it cannot be changed or redeclared.

2️⃣ What is the spread operator (...)?

ANS :The spread operator allows you to quickly Expand or spread elements of an or object into another :
    * Example const newArray = [...oldArray, 4, 5];
    * it is commonly used for copying arrays or merging multiple objects into one.

3️⃣ What is the difference between map(), filter(), and forEach()?

ANS :These are array methodes used to iterate over data, but they serve different purposes:
    *map():it transforms every element and returns a new array of the same length.

    *filter() :it checks each element against a condition and returns a new array containing only the elements that pass. 

    *forEach() : it simply executes a function for each element but dose not return
anything (returns undefined).

4️⃣ What is an arrow function?

ANS : An arraw function is a shorter syntax for writing function introduced in ES6:
     * syntax: const add = (a, b) => a + b;.
     *Unlike regular functions,array function do not have their own this context making them very useful for callbacks.
 
5️⃣ What are template literals?

ANS :Template Literals allow you you to work with strings more easily using backticks(``)instead of quotes:
    *Interpolation : you can insert variables directly into a string ${variable}.
    *Multi Line: They allow you to write strings across multiple lines without using escape characters like \n. 