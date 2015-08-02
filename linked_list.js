
// Reference:
// https://developer.mozilla.org/
//     en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

// "JavaScript is a prototype-based language and contains
// no class statement, such as is found in C++ or Java."
// So, for this OOP-centric data structure demo,
// we'll roll our own class by prototyping
// an object that has a constructor method!

// JavaScript doesn't namespace to files, so anything we
// put in here is going to share the global namespace.
// We should preempt namespace conflicts by favoring
// whatever came first. This is sometimes a preexisting
// version of the same code, but it can also be critical
// code someone else wrote. To make debugging easier later
// on, we should favor whatever claimed this namespace first.
var LinkedList = LinkedList || {};

// Prototyping the LinkedList constructor.
// Reference: http://stackoverflow.com/a/1115565
function LinkedList()
{

    this.head = null;
    this.tail = null;

    this.created_node_count = 0;
    this.deleted_node_count = 0;

    // A namespaced constructor for LinkedList nodes, for slight privacy.
    // Must come before things that reference the Node constructor.
    // Note that this is, in fact, a constructor; it must be called
    // with new, and it returns objects with these attributes.
    this.Node = function()
    {

        this.val = null;
        this.next_node = null;

    };

    // The insert function:
    // Add a Node to the head of the LinkedList and properly connect the chain.
    this.insert = function(value)
    {

        new_node = new this.Node();

        new_node.val = value;

        new_node.next_node = this.head;

        if (this.head === null)
        {
            this.tail = new_node;
        }

        this.head = new_node;

        this.created_node_count += 1;

    };

    this.pop = function()
    {

        value_to_return = this.head.val;

        this.head = this.head.next_node;

        if (this.head === null)
        {
            this.tail = null;
        }

        this.deleted_node_count += 1;

        return value_to_return;

    };

}

// Rudimentary tests. I'm checking it with Node.
var new_linked_list = new LinkedList();

console.log('\nnew LinkedList();\n');
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);

console.log('\nnew_linked_list.insert(5);\n');
new_linked_list.insert(5);
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);

console.log('\nnew_linked_list.insert(6);\n');
new_linked_list.insert(6);
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);

console.log('\nnew_linked_list.insert(7);\n');
new_linked_list.insert(7);
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);

console.log('\nnew_linked_list.pop();\n');
returned_val = new_linked_list.pop();
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);
console.log(returned_val);

console.log('\nnew_linked_list.pop();\n');
returned_val = new_linked_list.pop();
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);
console.log(returned_val);

console.log('\nnew_linked_list.pop();\n');
returned_val = new_linked_list.pop();
console.log(new_linked_list);
console.log(new_linked_list.head);
console.log(new_linked_list.tail);
console.log(returned_val);
