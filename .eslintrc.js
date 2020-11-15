module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
    worker: true,
  }, // reminder: put prettier last in the plugins list so it can remove rules that conflict with it
  plugins: [
    "react",
    "react-hooks",
    "jsx-a11y",
    "sonarjs",
    "import",
    "jest",
    "prefer-arrow",
    "sort-destructure-keys",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    //
    // Performing an operation on each element of an iterable is a common task. However, performing an await as part
    // of each operation is an indication that the program is not taking full advantage of the parallelization
    // benefits of async/await.
    "no-await-in-loop": "error", // // In JavaScript that is designed to be executed in the browser, it's considered a best practice to avoid using // methods on console. Such messages are considered to be for debugging purposes and therefore not suitable to // ship to the client. In general, calls using console should be stripped before being pushed to production.
    "no-alert": "error",
    "no-console": "error", // // if-else-if chains are commonly used when there is a need to execute only one branch (or at most one branch) out // of several possible branches, based on certain conditions.
    "no-dupe-else-if": "error", // // This rule restricts the use of parentheses to only where they are necessary.
    "no-import-assign": "error", // // Setters cannot return values. While returning a value from a setter does not produce an error, the returned // value is being ignored. Therefore, returning a value from a setter is either unnecessary or a possible error, // since the returned value cannot be used
    "no-setter-return": "error", // // Disallow assignments that can lead to race conditions due to usage of await or yield.
    "require-atomic-updates": "error", // // Enforces getter/setter pairs in objects and classes. It's a common mistake in JavaScript to create an object // with just a setter for a property but never have a corresponding getter defined for it. Without a getter, // you cannot read the property, so it ends up not being used.
    "accessor-pairs": "error", // // Array has several methods for filtering, mapping, and folding. If we forget to write return statement in a // callback of those, it's probably a mistake. If you don't want to use a return or don't need the returned // results, consider using .forEach instead.
    "array-callback-return": "error", // // This rule is aimed at reducing code complexity by capping the amount of cyclomatic complexity allowed in a // program. As such, it will warn when the cyclomatic complexity crosses the configured threshold.
    complexity: ["error", 10], // // Require Default Case in Switch Statements
    "default-case": "error", // // Switch statements are not required to have the "default" case last. As we require a default case, we now also // require that it be the last case option. Having it elsewhere is likely a sign of a bug or dev interruption.
    "default-case-last": "error", // // Putting default parameter at last allows function calls to omit optional tail arguments.
    "dot-notation": "error", // // It is considered good practice to use the type-safe equality operators === and !== instead of their regular // counterparts == and !=.
    eqeqeq: ["error", "allow-null"], // // Files containing multiple classes can often result in a less navigable and poorly structured codebase. Best // practice is to keep each file limited to a single responsibility.
    "max-classes-per-file": "error", // // In JavaScript, returning a value in the constructor of a class may be a mistake. Forbidding this pattern prevents // mistakes resulting from unfamiliarity with the language or a copy-paste error.
    "no-constructor-return": "error", // // If an if block contains a return statement, the else block becomes unnecessary. Its contents can be placed // outside of the block.
    "no-else-return": "error", // // Empty functions can reduce readability because readers need to guess whether it's intentional or not. So writing // a clear comment for empty functions is a good practice.
    "no-empty-function": "error", // // Comparing to null without a type-checking operator (== or !=), can have unintended results as the comparison // will evaluate to true when comparing to not just a null, but also an undefined value.
    "no-eq-null": "error", // // JavaScript's eval() function is potentially dangerous and is often misused. Using eval() on untrusted code // can open a program up to several different injection attacks. The use of eval() in most contexts can be // substituted for a better, alternative approach to a problem.
    "no-eval": "error", // // In JavaScript, you can extend any object, including builtin or "native" objects. Sometimes people change the // behavior of these native objects in ways that break the assumptions made about them in other parts of the code.
    "no-extend-native": "error", // // The bind() method is used to create functions with specific this values and, optionally, binds arguments to //specific values. When used to specify the value of this, it's important that the function actually uses this in // its function body.
    "no-extra-bind": "error", // // Float values in JavaScript contain a decimal point, and there is no requirement that the decimal point be // preceded or followed by a number.
    "no-floating-decimal": "error", // // It is the best practice to avoid 'polluting' the global scope with variables that are intended to be local to // the script.
    "no-implicit-globals": "error", // // It's considered a good practice to avoid using eval() in JavaScript. There are security and performance // implications involved with doing so, which is why many linters (including ESLint) recommend disallowing eval(). // However, there are some other ways to pass a string and have it interpreted as JavaScript code that have // similar concerns.
    "no-implied-eval": "error", // // Labeled statements in JavaScript are used in conjunction with break and continue to control flow around multiple // loops.
    "no-labels": "error", // // In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have // no use.
    "no-lone-blocks": "error", // // Writing functions within loops tends to result in errors due to the way the function creates a closure around // the loop.
    "no-loop-func": "error", // // 'Magic numbers' are numbers that occur multiple times in code without an explicit meaning. They should // preferably be replaced by named constants.
    "no-magic-numbers": [
      "error",
      {
        ignore: [
          0,
          1,
          2,
          3,
          200,
          302,
          304,
          400,
          401,
          403,
          404,
          409,
          429,
          500,
          501,
          503,
        ],
      },
    ], // // The goal of using new with a constructor is typically to create an object of a particular type and store that // object in a variable,.
    "no-new": "error", // // It's possible to create functions in JavaScript using the Function constructor.
    "no-new-func": "error", // // As of the ECMAScript 5 specification, octal escape sequences in string literals are deprecated and should not // be used. Unicode escape sequences should be used instead.
    "no-octal-escape": "error", // // Assignment to variables declared as function parameters can be misleading and lead to confusing behavior, as // modifying function parameters will also mutate the arguments object. Often, assignment to function parameters // is unintended and indicative of a mistake or programmer error.
    "no-param-reassign": "error", // // __proto__ property has been deprecated as of ECMAScript 3.1 and shouldn't be used in the code. Use // Object.getPrototypeOf and Object.setPrototypeOf instead.
    "no-proto": "error", // // One of the interesting, and sometimes confusing, aspects of JavaScript is that assignment can happen at almost // any point. Because of this, an errant equals sign can end up causing assignment when the true intent was to do a // comparison. This is especially true when using a return statement.
    "no-return-assign": "error", // // Inside an async function, return await is seldom useful. Since the return value of an async function is always // wrapped in Promise.resolve, return await doesn’t actually do anything except add extra time before the // overarching Promise resolves or rejects. The only valid exception is if return await is used in a try/catch // statement to catch errors from another Promise-based function.
    "no-return-await": "error", // // Using javascript: URLs is considered by some as a form of eval. Code passed in javascript: URLs has to be parsed // and evaluated by the browser in the same way that eval is processed.
    "no-script-url": "error", // // Comparing a variable against itself is usually an error, either a typo or refactoring error. It is confusing to // the reader and may potentially introduce a runtime error.
    "no-self-compare": "error", // // The comma operator includes multiple expressions where only one is expected. It evaluates each operand from left // to right and returns the value of the last operand. However, this frequently obscures side effects, and its use // is often an accident.
    "no-sequences": "error", // // It is considered good practice to only throw the Error object itself or an object using the Error object as base // objects for user-defined exceptions. The fundamental benefit of Error objects is that they automatically keep // track of where they were built and originated.
    "no-throw-literal": "error", // // Useless regex backreferences are a possible error in the code. It usually indicates that the regular expression // does not work as intended.
    "no-useless-backreference": "error", // // The function invocation can be written by Function.prototype.call() and Function.prototype.apply(). But // Function.prototype.call() and Function.prototype.apply() are slower than the normal function invocation.
    "no-useless-call": "error", // // It's unnecessary to concatenate two strings together.
    "no-useless-concat": "error", // // A return; statement with nothing after it is redundant, and has no effect on the runtime behavior of a function. // This can be confusing, so it's better to disallow these redundant statements.
    "no-useless-return": "error", // // The void operator takes an operand and returns undefined: void expression will evaluate expression and return // undefined. It can be used to ignore any side effects expression may produce.
    "no-void": "error", // // It is considered good practice to only pass instances of the built-in Error object to the reject() function for // user-defined errors in Promises. Error objects automatically store a stack trace, which can be used to debug an // error by determining where it came from. If a Promise is rejected with a non-Error value, it can be difficult // to determine where the rejection occurred.
    "prefer-promise-reject-errors": "error", // // When using the parseInt() function it is common to omit the second argument, the radix, and let the function try // to determine from the first argument what type of number it is. By default, parseInt() will autodetect decimal // and hexadecimal (via 0x prefix). Prior to ECMAScript 5, parseInt() also autodetected octal literals, which // caused problems because many developers assumed a leading 0 would be ignored.
    radix: "error", // // Asynchronous functions that don't use await might not need to be asynchronous functions and could be the // unintentional result of refactoring.
    "require-await": "error", // // You can immediately invoke function expressions, but not function declarations. A common technique to create an // immediately-invoked function expression (IIFE) is to wrap a function declaration in parentheses. The opening // parentheses causes the contained function to be parsed as an expression, rather than a declaration.
    "wrap-iife": "error", // // Yoda conditions are so named because the literal value of the condition comes first while the variable comes // second. This rule aims to enforce consistent style of conditions which compare a variable to a literal value.
    yoda: "error", // // Trailing newlines in non-empty files are a common UNIX idiom. Benefits of trailing newlines include the ability // to concatenate or append to files as well as output files to the terminal without interfering with shell prompts.
    "eol-last": "error", // // Many developers consider code difficult to read if blocks are nested beyond a certain depth.
    "max-depth": ["error", 3], // // Some people consider large files a code smell. Large files tend to do a lot of things and can make it hard // following what's going. While there is not an objective maximum number of lines considered acceptable in a file, // most people would agree it should not be in the thousands.
    "max-lines": [
      "error",
      { max: 350, skipBlankLines: true, skipComments: true },
    ], // // Some people consider large functions a code smell. Large functions tend to do a lot of things and can make it // hard following what's going on. Many coding style guides dictate a limit of the number of lines that a // function can comprise of.
    "max-lines-per-function": [
      "error",
      { max: 80, skipBlankLines: true, skipComments: true, IIFEs: true },
    ], // // Many JavaScript libraries use the callback pattern to manage asynchronous operations. A program of any // complexity will most likely need to manage several asynchronous operations at various levels of concurrency. // A common pitfall that is easy to fall into is nesting callbacks, which makes code more difficult to read the // deeper the callbacks are nested.
    "max-nested-callbacks": ["error", 3], // // Functions that take numerous parameters can be difficult to read and write because it requires the memorization // of what each parameter is, its type, and the order they should appear in. As a result, many coders adhere to a // convention that caps the number of parameters a function can take.
    "max-params": ["error", 4], // // The new operator in JavaScript creates a new instance of a particular type of object. That type of object is // represented by a constructor function. Since constructor functions are just regular functions, the only defining // characteristic is that new is being used as part of the call. Native JavaScript functions begin with an // uppercase letter to distinguish those functions that are to be used as constructors from functions that are not.
    "new-cap": "error", // // If an if statement is the only statement in the else block, it is often clearer to use an else if form.
    "no-lonely-if": "error", // // Chaining the assignment of variables can lead to unexpected results and be difficult to read
    "no-multi-assign": "error", // // Negated conditions are more difficult to understand. Code can be made more readable by inverting the condition instead.
    "no-negated-condition": "error", // // Nesting ternary expressions can make code more difficult to understand.
    "no-nested-ternary": "error", // // It's a common mistake in JavaScript to use a conditional expression to select between two Boolean values instead // of using ! to convert the test to a Boolean.
    "no-unneeded-ternary": "error", // // Using a single import statement per module will make the code clearer because you can see everything being // imported from that module on one line.
    "no-duplicate-imports": "error", // // It's unnecessary to use computed properties with literals.
    "no-useless-computed-key": ["error", { enforceForClassMembers: true }], // // ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide // an empty constructor or one that simply delegates into its parent class,.
    "no-useless-constructor": "error", // // ES2015 allows for the renaming of references in import and export statements as well as destructuring // assignments. This gives programmers a concise syntax for performing these operations while renaming these // references.
    "no-useless-rename": "error", // // ECMAScript 6 allows programmers to create variables with block scope instead of function scope using the let and // const keywords. Block scope is common in many other programming languages and helps programmers avoid mistakes.
    "no-var": "error", // // ES6 introduced arrow functions as an alternative to the regular `function` expression, although ommiting // bindings to keywords including `this`. `this`'s confusing behaviour is a common source of errors in Javascript.
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
      },
    ], // // If a variable is never reassigned, using the const declaration is better.
    "prefer-const": "error", // // With JavaScript ES6, a new syntax was added for creating variables from an array index or object property, // called destructuring. This rule enforces usage of destructuring instead of accessing a property through a member // expression.
    "prefer-destructuring": [
      "error",
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ], // // There are rest parameters in ES2015. We can use that feature for variadic functions instead of the arguments variable.
    "prefer-rest-params": "error", // // Before ES2015, one must use Function.prototype.apply() to call variadic functions.
    "prefer-spread": "error", // // In ES2015 (ES6), we can use template literals instead of string concatenation.
    "prefer-template": "error", // // An unused expression which has no effect on the state of the program indicates a logic error.
    "no-unused-expressions": "error", // // Enforce a convention in the order of require() / import statements. Sort the order within each group in // alphabetical manner based on import name.
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ], // // When declaring multiple properties, some developers prefer to sort property names alphabetically to be able to // find necessary property easier at the later time. Others feel that it adds complexity and becomes burden to maintain.
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, natural: false, minKeys: 2 },
    ], // // When declaring multiple variables within the same block, some developers prefer to sort variable names // alphabetically to be able to find necessary variable easier at the later time. Others feel that it adds complexity // and becomes burden to maintain.
    "sort-vars": ["error", { ignoreCase: true }], // // Allow BigInt.
    "valid-typeof": "error", // // Emoji have become a common way of communicating content to the end user. To a person using a screenreader, // however, he/she may not be aware that this content is there at all. By wrapping the emoji in a <span>, giving it // the role="img", and providing a useful description in aria-label, the screenreader will treat the emoji as an // image in the accessibility tree with an accessible name for the end user.
    "jsx-a11y/accessible-emoji": "error", // // Enforce that all elements that require alternative text have meaningful information to relay back to the end user. // This is a critical component of accessibility for screenreader users in order for them to understand the content's // purpose on the page. By default, this rule checks for alternative text on the following elements: <img>, <area>, // <input type="image">, and <object>.
    "jsx-a11y/alt-text": "error", // // Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it // is not hidden using the aria-hidden prop. Refer to the references to learn about why this is important.
    "jsx-a11y/anchor-has-content": [
      "error",
      {
        components: ["a", "Link"],
      },
    ], // // The HTML <a> element, with a valid href attribute, is formally defined as representing a hyperlink. That is, a // link between one HTML document and another, or between one location inside an HTML document and another location // inside the same document. // In fact, the interactive, underlined <a> element has become so synonymous with web navigation that this // expectation has become entrenched inside browsers, assistive technologies such as screen readers and in how // people generally expect the internet to behave. In short, anchors should navigate.
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ], // // aria-activedescendant is used to manage focus within a composite widget. The element with the attribute // aria-activedescendant retains the active document focus; it indicates which of its child elements has secondary // focus by assigning the ID of that element to the value of aria-activedescendant. This pattern is used to build a // widget like a search typeahead select list. The search input box retains document focus so that the user can type // in the input. If the down arrow key is pressed and a search suggestion is highlighted, the ID of the suggestion // element will be applied as the value of aria-activedescendant on the input element.
    "jsx-a11y/aria-activedescendant-has-tabindex": "error", // // Elements cannot use an invalid ARIA attribute. This will fail if it finds an aria-* property that is not listed // in WAI-ARIA States and Properties spec. // @see https://www.w3.org/WAI/PF/aria-1.1/states_and_properties
    "jsx-a11y/aria-props": "error", // // ARIA state and property values must be valid.
    "jsx-a11y/aria-proptypes": "error", // // Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at WAI-ARIA site. // @see https://www.w3.org/TR/wai-aria/#role_definitions
    "jsx-a11y/aria-role": "error", // // Certain reserved DOM elements do not support ARIA roles, states and properties. This is often because they are // not visible, for examples meta, html, script, style. This rule enforces that these DOM elements do not contain the // role and/or aria-* props.
    "jsx-a11y/aria-unsupported-elements": "error", // // Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress. Coding for the // keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and // screenreader users.
    "jsx-a11y/click-events-have-key-events": "error", // // Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers. // Accessible means that it is not hidden using the aria-hidden prop. Refer to the references to learn about why // this is important.
    "jsx-a11y/heading-has-content": "error", // // Html element must have the lang prop.
    "jsx-a11y/html-has-lang": "error", // // <iframe> elements must have a unique title property to indicate its content to the user.
    "jsx-a11y/iframe-has-title": "error", // // Enforce img alt attribute does not contain the word image, picture, or photo. Screenreaders already announce img // elements as an image. There is no need to use words such as image, photo, and/or picture.
    "jsx-a11y/img-redundant-alt": "error", // // Elements with an interactive role and interaction handlers (mouse or key press) must be focusable. // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/interactive-supports-focus.md
    "jsx-a11y/interactive-supports-focus": "error", // // Enforce that a label tag has a text label and an associated control. This rule checks that any label tag (or an // indicated custom component that will output a label tag) either (1) wraps an input element (or an indicated // custom component that will output an input tag) or (2) has an htmlFor attribute and that the label tag has text // content.
    "jsx-a11y/label-has-associated-control": "error", // // The lang prop on the <html> element must have a valid value based on ISO country and language codes.
    "jsx-a11y/lang": "error", // // Providing captions for media is essential for deaf users to follow along. Captions should be a transcription or // translation of the dialogue, sound effects, relevant musical cues, and other relevant audio information. Not only // is this important for accessibility, but can also be useful for all users in the case that the media is // unavailable (similar to alt text on an image when an image is unable to load).
    "jsx-a11y/media-has-caption": [
      "error",
      {
        audio: ["Audio"],
        video: ["Video"],
        track: ["Track"],
      },
    ], // // Enforce onmouseover/onmouseout are accompanied by onfocus/onblur. Coding for the keyboard is important for users // with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users
    "jsx-a11y/mouse-events-have-key-events": "error", // // Enforce no accessKey prop on element. Access keys are HTML attributes that allow web developers to assign // keyboard shortcuts to elements. Inconsistencies between keyboard shortcuts and keyboard commands used by // screenreader and keyboard only users create accessibility complications so to avoid complications, access keys // should not be used.
    "jsx-a11y/no-access-key": "error", // // Enforce that autoFocus prop is not used on elements. Autofocusing elements can cause usability issues for sighted // and non-sighted users, alike.
    "jsx-a11y/no-autofocus": "error", // // Enforces that no distracting elements are used. Elements that can be visually distracting can cause accessibility // issues with visually impaired users. Such elements are most likely deprecated, and should be avoided. By default, // the following elements are visually distracting: <marquee> and <blink>.
    "jsx-a11y/no-distracting-elements": "error", // // Interactive HTML elements indicate controls in the user interface. Interactive elements include <a href>, // <button>, <input>, <select>, <textarea>. // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-interactive-element-to-noninteractive-role.md
    "jsx-a11y/no-interactive-element-to-noninteractive-role": "error", // // Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user // interface. A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive // elements include <main>, <area>, <h1> (,<h2>, etc), <p>, <img>, <li>, <ul> and <ol>. Non-interactive WAI-ARIA // roles include article, banner, complementary, img, listitem, main, region and tooltip. // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-noninteractive-element-interactions.md
    "jsx-a11y/no-noninteractive-element-interactions": "error", // // Non-interactive HTML elements indicate content and containers in the user interface. Non-interactive elements // include <main>, <area>, <h1> (,<h2>, etc), <img>, <li>, <ul> and <ol>. // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/no-noninteractive-element-to-interactive-role.md
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "error", // // Tab key navigation should be limited to elements on the page that can be interacted with. Thus it is not // necessary to add a tabindex to items in an unordered list, for examples, to make them navigable through assistive // technology. These applications already afford page traversal mechanisms based on the HTML of the page. Generally, // we should try to reduce the size of the page's tab ring rather than increasing it.
    "jsx-a11y/no-noninteractive-tabindex": "error", // // Enforce usage of onBlur over/in parallel with onChange on select menu elements for accessibility. onBlur should // be used instead of onChange, unless absolutely necessary and it causes no negative consequences for keyboard only // or screen reader users. onBlur is a more declarative action by the user: for instance in a dropdown, using the // arrow keys to toggle between options will trigger the onChange event in some browsers. Regardless, when a change // of context results from an onBlur event or an onChange event, the user should be notified of the change unless it // occurs below the currently focused element.
    "jsx-a11y/no-onchange": "error", // // Some HTML elements have native semantics that are implemented by the browser. This includes default/implicit ARIA // roles. Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
    "jsx-a11y/no-redundant-roles": "error", // // Static HTML elements do not have semantic meaning. This is clear in the case of <div> and <span>. It is less so // clear in the case of elements that seem semantic, but that do not have a semantic mapping in the accessibility // layer. For examples <a>, <big>, <blockquote>, <footer>, <picture>, <strike> and <time> -- to name a few -- have // no semantic layer mapping. They are as void of meaning as <div>.
    "jsx-a11y/no-static-element-interactions": "error", // // Elements with ARIA roles must have all required attributes for that role.
    "jsx-a11y/role-has-required-aria-props": "error", // // Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that // role. Many ARIA attributes (states and properties) can only be used on elements with particular roles. Some // elements have implicit roles, such as <a href="#" />, which will resolve to role="link".
    "jsx-a11y/role-supports-aria-props": "error", // // The scope scope should be used only on <th> elements.
    "jsx-a11y/scope": "error", // // Avoid positive tabIndex property values to synchronize the flow of the page with keyboard tab order.
    "jsx-a11y/tabindex-no-positive": "error", // // Enforce a consistent naming pattern for props which expect a boolean value.
    "react/boolean-prop-naming": [
      "warn",
      {
        rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+",
      },
    ], // // The default value of type attribute for button HTML element is "submit" which is often not the desired behavior // and may lead to unexpected page reloads. This rules enforces an explicit type attribute for all the button // elements and checks that its value is valid per spec (i.e., is one of "button", "submit", and "reset").
    "react/button-has-type": "error", // // Enforce consistent usage of destructuring assignment of props, state, and context.
    "react/destructuring-assignment": ["error", "always"], // // This rule prevents passing of props that add lots of complexity (className, style) to Components. This rule only // applies to Components (e.g. <Foo />) and not DOM nodes (e.g. <div />). The list of forbidden props can be // customized with the forbid option.
    "react/forbid-component-props": [
      "error",
      {
        forbid: ["style"],
      },
    ], // //
    "react/forbid-dom-props": [
      "error",
      {
        forbid: ["style"],
      },
    ], // // This rule should prevent usage of this.state inside setState calls. Such usage of this.state might result in // errors when two state calls are called in batch and thus referencing old state and not the current state.
    "react/no-access-state-in-setstate": "error", // // It's a bad idea to use the array index since it doesn't uniquely identify your elements. In cases where the array // is sorted or an element is added to the beginning of the array, the index will be changed even though the element // representing that index may be the same. This results in unnecessary renders.
    "react/no-array-index-key": "error", // // Children should always be actual children, not passed in as a prop. When using JSX, the children should be nested // between the opening and closing tags. When not using JSX, the children should be passed as additional arguments // to React.createElement.
    "react/no-children-prop": "error", // // This rule helps prevent problems caused by using children and the dangerouslySetInnerHTML prop at the same time. // React will throw a warning if this rule is ignored.
    "react/no-danger-with-children": "error", // // Several methods are deprecated between React versions. This rule will warn you if you try to use a deprecated // method. Use the shared settings to specify the React version.
    "react/no-deprecated": "error", // // Updating the state after a component mount or update will trigger a second render() call and can lead to // property/layout thrashing.
    "react/no-did-mount-set-state": "error", // // Updating the state after a component mount or update will trigger a second render() call and can lead to // property/layout thrashing.
    "react/no-did-update-set-state": "error", // // NEVER mutate this.state directly, as calling setState() afterwards may replace the mutation you made. Treat // this.state as if it were immutable. The only place that's acceptable to assign this.state is in a ES6 class // component constructor.
    "react/no-direct-mutation-state": "error", // // Facebook will eventually deprecate findDOMNode as it blocks certain improvements in React in the future. It is // recommended to use callback refs instead.
    "react/no-find-dom-node": "error", // // isMounted is an anti-pattern, is not available when using ES6 classes, and it is on its way to being officially // deprecated.
    "react/no-is-mounted": "error", // // Declaring only one component per file improves readability and reusability of components.
    "react/no-multi-comp": "error", // // Warns if you have shouldComponentUpdate defined when defining a component that extends React.PureComponent. // While having shouldComponentUpdate will still work, it becomes pointless to extend PureComponent.
    "react/no-redundant-should-component-update": "error", // // Ensure no casing typos were made declaring static class properties and lifecycle methods. Checks that declared // contextTypes and childContextTypes is supported by react-props
    "react/no-typos": "error", // // Currently, two ways are supported by React to refer to components. The first way, providing a string identifier, // is now considered legacy in the official documentation. The documentation now prefers a second method -- // referring to components by setting a property on the this object in the reference callback.
    "react/no-string-refs": "error", // // When using a stateless functional component (SFC), props/context aren't accessed in the same way as a class // component or the create-react-class format. Both props and context are passed as separate arguments to the // component instead. Also, as the name suggests, a stateless component does not have state on this.state.
    "react/no-this-in-sfc": "error", // // This rule prevents characters that you may have meant as JSX escape characters from being accidentally injected // as a text node in JSX statements.
    "react/no-unescaped-entities": "error", // // In JSX all DOM properties and attributes should be camelCased to be consistent with standard JavaScript style. // This can be a possible source of error if you are used to writing plain HTML.
    "react/no-unknown-property": "error", // // Warns you if you have defined a property on the state, but it is not being used anywhere.
    "react/no-unused-state": "error", // // Updating the state during the componentWillUpdate step can lead to indeterminate component state and is not allowed.
    "react/no-will-update-set-state": "error", // //React offers you two ways to create traditional components: using the ES5 create-react-class module or the new // ES6 class system. This rule allows you to enforce one way or another.
    "react/prefer-es6-class": ["error", "always"], // // Stateless functional components are simpler than class based components and will benefit from future React // performance optimizations specific to these components.
    "react/prefer-stateless-function": "error", // // When writing the render method in a component it is easy to forget to return the JSX content. This rule will warn // if the return statement is missing.
    "react/require-render-return": "error", // // Components without children can be self-closed to avoid unnecessary extra closing tag.
    "react/self-closing-comp": "error", // // When creating React components it is more convenient to always follow the same organisation for method order to // help you easily find lifecycle methods, event handlers, etc.
    "react/sort-comp": [
      "error",
      {
        order: ["lifecycle", "render", "everything-else"],
        groups: {
          lifecycle: [
            "displayName",
            "mixins",
            "type-annotations",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "statics",
            "instance-variables",
            "loadProps",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "state",
            "getInitialState",
            "getInitialProps",
            "getDerivedStateFromProps",
            "getChildContext",
            "componentWillAppear",
            "componentDidAppear",
            "componentWillEnter",
            "componentDidEnter",
            "componentWillMount",
            "UNSAFE_componentWillMount",
            "componentDidMount",
            "componentDidCatch",
            "componentWillReceiveProps",
            "UNSAFE_componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "UNSAFE_componentWillUpdate",
            "componentDidUpdate",
            "componentWillLeave",
            "componentDidLeave",
            "componentWillUnmount",
          ],
        },
      },
    ], // // This rule will enforce the state initialization style to be either in a constructor or with a class property.
    "react/state-in-constructor": ["error", "never"], // // There are some HTML elements that are only self-closing (e.g. img, br, hr). These are collectively known as void // DOM elements.
    "react/void-dom-elements-no-children": "error", // // When using a boolean attribute in JSX, you can set the attribute value to true or omit the value. This rule will // enforce one or the other to keep consistency in your code.
    "react/jsx-boolean-value": "error", // // Enforce the closing tag location for multiline JSX elements.
    "react/jsx-closing-tag-location": "error", // // Restrict file extensions that may contain JSX.
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ], // // Ensures that any component or prop methods used to handle events are correctly prefixed.
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
      },
    ], // // Warn if an element that likely requires a key prop--namely, one present in an array literal or an arrow function // expression.
    "react/jsx-key": ["error", { checkFragmentShorthand: true }], // // This option validates a specific depth for JSX.
    "react/jsx-max-depth": [
      "error",
      {
        max: 5,
      },
    ], // // A bind call or arrow function in a JSX prop will create a brand new function on every single render. This is bad // for performance, as it may cause unnecessary re-renders if a brand new function is passed as a prop to a // component that uses reference equality check on the prop to determine if it should update.
    "react/jsx-no-bind": "error", // // This rule prevents comment strings (e.g. beginning with // or /*) from being accidentally injected as a text // node in JSX statements
    "react/jsx-no-comment-textnodes": "error", // // Creating JSX elements with duplicate props can cause unexpected behavior in your application.
    "react/jsx-no-duplicate-props": "error", // // When creating a JSX element that has an a tag, it is often desired to have the link open in a new tab using the // target='_blank' attribute. Using this attribute unaccompanied by rel='noreferrer noopener', however, is a severe // security vulnerability (see here for more details) This rules requires that you accompany target='_blank' // attributes with rel='noreferrer noopener'.
    "react/jsx-no-target-blank": "error", // // This rule helps locate potential ReferenceErrors resulting from misspellings or missing components.
    "react/jsx-no-undef": "error", // // Disallow unnecessary fragments. A fragment is redundant if it contains only one child, or if it is the child of // a html element, and is not a keyed fragment.
    "react/jsx-no-useless-fragment": "error", // // In JSX, a React fragment is created either with <React.Fragment>...</React.Fragment>, or, using the shorthand // syntax, <>...</>.
    "react/jsx-fragments": ["error", "syntax"], // // Enforces coding style that user-defined JSX components are defined and referenced in PascalCase.
    "react/jsx-pascal-case": "error", // // Some developers prefer to sort props names alphabetically to be able to find necessary props easier at the later // time. Others feel that it adds complexity and becomes burden to maintain.
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ], // // Checks rules of Hooks.
    "react-hooks/rules-of-hooks": "error", // // Checks effect dependencies.
    "react-hooks/exhaustive-deps": "error", // // Having all branches in a switch or if chain with the same implementation is an error. Either a copy-paste error // was made and something different should be executed, or there shouldn't be a switch/if chain at all. Note that // this rule does not apply to if chains without else, or to switch without default clauses.
    "sonarjs/no-all-duplicated-branches": "error", // // It is highly suspicious when a value is saved for a key or index and then unconditionally overwritten. Such // replacements are likely in error.
    "sonarjs/no-element-overwrite": "error", // // You can easily call a JavaScript function with more arguments than the function needs, but the extra arguments // will be just ignored by function execution.
    "sonarjs/no-extra-arguments": "error", // // A chain of if/else if statements is evaluated from top to bottom. At most, only one branch will be executed: the // first one with a condition that evaluates to true.
    "sonarjs/no-identical-conditions": "error", // // Using the same value on either side of a binary operator is almost always a mistake. In the case of logical // operators, it is either a copy/paste error and therefore a bug, or it is simply wasted code, and should be // simplified. In the case of bitwise operators and most binary mathematical operators, having the same value on // both sides of an operator yields predictable results, and should be simplified.
    "sonarjs/no-identical-expressions": "error", // // A loop with at most one iteration is equivalent to the use of an if statement to conditionally execute one piece // of code. No developer expects to find such a use of a loop statement. If the initial intention of the author was // really to conditionally execute one piece of code, an if statement should be used instead.
    "sonarjs/no-one-iteration-loop": "error", // // If a function does not return anything, it makes no sense to use its output. Specifically, passing it to another // function, or assigning its "result" to a variable is probably a bug because such functions return undefined, // which is probably not what was intended.
    "sonarjs/no-use-of-empty-return-value": "error", // // Cognitive Complexity is a measure of how hard the control flow of a function is to understand. Functions with // high Cognitive Complexity will be difficult to maintain. This is different from cyclomatic complexity.
    "sonarjs/cognitive-complexity": ["error", 15], // // When switch statements have large sets of case clauses, it is usually an attempt to map two sets of data. A real // map structure would be more readable and maintainable, and should be used instead.
    "sonarjs/max-switch-cases": ["error", 10], // // Merging collapsible if statements increases the code's readability.
    "sonarjs/no-collapsible-if": "error", // // Prevent checking a collection (Set, Map or Array) for a length "greater or equal to zero" or "less than zero" as // these are always true or impossible to have.
    "sonarjs/no-collection-size-mischeck": "error", // // Duplicated string literals make the process of refactoring error-prone, since you must be sure to update all // occurrences. On the other hand, constants can be referenced from many places, but only need to be updated in a // single place.
    "sonarjs/no-duplicate-string": "error", // // Having two cases in a switch statement or two branches in an if chain with the same implementation is at best // duplicate code, and at worst a coding error. If the same logic is truly needed for both instances, then in an if // chain they should be combined, or for a switch, one should fall through to the other.
    "sonarjs/no-duplicated-branches": "error", // // When two functions have the same implementation, either it was a mistake - something else was intended - or the // duplication was intentional, but may be confusing to maintainers. In the latter case, the code should be refactored.
    "sonarjs/no-identical-functions": "error", // // It is needlessly complex to invert the result of a boolean comparison. The opposite comparison should be made instead.
    "sonarjs/no-inverted-boolean-check": "error", // // Redundant Boolean literals should be removed from expressions to improve readability.
    "sonarjs/no-redundant-boolean": "error", // // Jump statements, such as return, break and continue let you change the default flow of program execution, but // jump statements that direct the control flow to the original direction are just a waste of keystrokes.
    "sonarjs/no-redundant-jump": "error", // // Code is clearest when each statement has its own line.
    "sonarjs/no-same-line-conditional": "error", // // Switch statements are useful when there are many different cases depending on the value of the same expression. // For just one or two cases however, the code will be more readable with if statements.
    "sonarjs/no-small-switch": "error", // // When a collection is populated but its contents are never used, then it is surely some kind of mistake. Either // refactoring has rendered the collection moot, or an access is missing.
    "sonarjs/no-unused-collection": "error", // // A catch clause that only rethrows the caught exception has the same effect as omitting the catch altogether and // letting it bubble up automatically, but with more code and the additional detriment of leaving maintainers // scratching their heads. Also a good reminder to add appropriate logging.
    "sonarjs/no-useless-catch": "error", // // Declaring a variable only to immediately return or throw it is a bad practice. Some developers argue that the // practice improves code readability, because it enables them to explicitly name what is being returned. However, // this variable is an internal implementation humanMessage that is not exposed to the callers of the method. The method // name should be sufficient for callers to know exactly what will be returned.
    "sonarjs/prefer-immediate-return": "error", // // Object literal syntax, which initializes an object's properties inside the object declaration is cleaner and // clearer than the alternative: creating an empty object, and then giving it properties one by one.
    "sonarjs/prefer-object-literal": "error", // // Return of boolean literal statements wrapped into if-then-else ones should be simplified
    "sonarjs/prefer-single-boolean-return": "error", // // When only the condition expression is defined in a for loop, and the initialization and increment expressions are // missing, a while loop should be used instead to increase readability.
    "sonarjs/prefer-while": "error", // // Require object destructured keys to be sorted alphabetically

    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      { caseSensitive: false },
    ], // // Ensures an imported module can be resolved to a module on the local filesystem, as defined by standard Node // require.resolve behavior.

    "import/no-unresolved": "error", // // Verifies that all named imports are part of the set of named exports in the referenced module.
    "import/named": "error", // // If a default import is requested, this rule will report if there is no default export in the imported module.
    "import/default": "error", // // Node.js allows the import of modules using an absolute path such as /home/xyz/file.js. That is a bad practice // as it ties the code using it to your computer, and therefore makes it unusable in packages distributed on npm // for instance.
    "import/no-absolute-path": "error", // // The require method from CommonJS is used to import modules from different files. Unlike the ES6 import syntax, // it can be given expressions that will be resolved at runtime. While this is sometimes necessary and useful, in // most cases it isn't. Using expressions (for instance, concatenating a path and variable) as the argument makes // it harder for tools to do static code analysis, or to find where in the codebase a module is used.
    "import/no-dynamic-require": "error", // // Forbid Webpack loader syntax in imports.
    "import/no-webpack-loader-syntax": "error", // // Forbid a module from importing itself. This can sometimes happen during refactoring.
    "import/no-self-import": "error", // // Ensures that there is no resolvable path back to this module via its dependencies.
    "import/no-cycle": ["error", { maxDepth: 3 }], // // Use this rule to prevent unnecessary path segments in import and require statements.
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }], // // Reports modules without any exports and individual exports not being statically imported or requireed from other // modules in the same project
    "import/no-unused-modules": ["error"], // // Reports funny business with exports, like repeated exports of names or defaults.
    "import/export": "error", // // Reports use of an exported name as the locally imported name of a default export.  Rationale: using an exported // name as the name of the default export is likely misleading or a mistake.
    "import/no-named-as-default": "error", // // Reports use of an exported name as a property on the default export.
    "import/no-named-as-default-member": "error", // // Reports use of a deprecated name, as indicated by a JSDoc block with a @deprecated tag.
    "import/no-deprecated": "error", // // Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies, // optionalDependencies, peerDependencies, or bundledDependencies. The closest parent package.json will be used. // If no package.json is found, the rule will not lint anything.
    "import/no-extraneous-dependencies": "error", // // Forbids the use of mutable exports with var or let.
    "import/no-mutable-exports": "error", // // This rule reports any imports that come after non-import statements.
    "import/first": "error", // // Reports if a resolved path is imported more than once.
    "import/no-duplicates": "error", // // Some file resolve algorithms allow you to omit the file extension within the import source path. For examples // the node resolver can resolve ./foo/bar to the absolute path /User/someone/foo/bar.js because the .js extension // is resolved automatically by default.
    "import/extensions": ["error", "never"], // // Forbid modules to have too many dependencies (import or require statements).
    "import/max-dependencies": ["error", { max: 20 }], // // Prohibit default exports. Discoverability is very poor for default exports. You cannot explore a module with // intellisense to see if it has a default export or not.
    "import/no-default-export": "error", // // Naming conventions ensure consistency and predictability across a codebase.

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
        trailingUnderscore: "forbid",
      },

      {
        selector: "memberLike",
        modifiers: ["private"],
        format: ["camelCase"],
        leadingUnderscore: "require",
        trailingUnderscore: "forbid",
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
      },
      {
        selector: "class",
        format: ["PascalCase"],
      },
      {
        selector: "typeAlias",
        format: ["PascalCase"],
        prefix: ["T"],
      },
      {
        selector: "interface",
        format: ["PascalCase"],
        prefix: ["I"],
      },
      {
        selector: "enum",
        format: ["PascalCase"],
        prefix: ["Enum", "E"],
      },
    ], // // disable some typescript rules

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off", // // add prettier's rules (that are automatically fixed by prettier) to eslint for completeness

    "prettier/prettier": "error",
  },
  overrides: [
    // I like package.json files to have properties in a specific order
    {
      files: ["**/package.json"],
      rules: {
        "no-unused-expressions": "off",
        "sort-keys": "off",
      },
    }, // test files are always full of exceptions

    {
      files: [
        "**/*.test.js",
        "**/*.test.ts",
        "**/*.spec.ts",
        "**/*.spec.tsx",
        "**/*.e2e.ts",
        "**/*.e2e.tsx",
        "**/test/**/*",
        "**/__mocks__/**/*",
      ],
      rules: {
        camelcase: "off",
        "import/no-default-export": "off",
        "import/no-relative-parent-imports": "off", // Better to remove a test than to skip it
        "jest/no-disabled-tests": "error", // Because it is easy to forget to remove `it.only`s ;)
        "jest/no-focused-tests": "error",
        "max-lines-per-function": "off",
        "max-nested-callbacks": ["error", 4],
        "no-magic-numbers": "off",
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "off",
        "sort-imports": "off",
        "sort-keys": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/ban-ts-comment": "off",
      },
    }, // javascript files should not be subject to typescript rules

    {
      files: ["**/*.js"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/naming-convention": "off",
      },
    }, // Next.js & React pages have to have a default export

    {
      files: ["**/src/pages/**/*.tsx", "**/src/modules/**/pages/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    }, // Redux reducers have a default (initial state) value first, we cannot change this

    {
      files: ["**/src/**/redux/*Reducer.ts", "**/src/modules/**/reducer.ts"],
      rules: {
        "default-param-last": "off",
        "sonarjs/no-small-switch": "off",
      },
    }, // styles.ts files

    {
      files: ["**/*styles.tsx"],
      rules: {
        "max-lines-per-function": [
          "error",
          { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true },
        ],
        "no-magic-numbers": "off",
        "sort-keys": "off",
      },
    }, // translation files

    {
      files: ["**/locales/**/*.json"],
      rules: {
        "no-unused-expressions": "off",
        "sort-keys": "off",
      },
    },
  ],
};
