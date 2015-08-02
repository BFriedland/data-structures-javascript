
// Contains a LinkedList class for constructing
// linked lists out of Node objects.
// This has nothing to do with Node.js or <li> HTML tags.

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

        // This method recursively finds and returns the first
        // Node encountered in the LinkedList with the supplied
        // value, working from the head to the tail.
        this.find_node_with_value = function (value)
        {

            if (this.val === value) {
                return this;
            }
            else if (this.next_node === null)
            {
                return null;
            }
            else
            {
                // Recursion. Note this is calling
                // the instance method on next_node!
                return this.next_node.find_node_with_value(value);
            }

        };

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

    // Remove a Node from the LinkedList, return the Node's
    // value, and stitch the LinkedList back together.
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

    // Return the length of the LinkedList.
    this.list_size = function()
    {

        return (this.created_node_count - this.deleted_node_count);

    };

    // Return the result of having this LinkedList's Nodes serially
    // check themselves for the presence of a supplied value.
    // If the value is not found, return null.
    this.search = function(value) {

        if (this.head === null)
        {
            return null;
        }

        return this.head.find_node_with_value(value);

    };

    // Remove a node from anywhere in the
    // LinkedList and stitch the loose ends.
    // This function must be handed a Node
    // object that is in the chain (because
    // it checks node identity), which can
    // be obtained with the search method.
    this.remove = function(node_to_remove) {

        // Cancel the removal function if nothing is
        if (this.head === null)
        {
            return null;
        }

        // Handling the stitch-the-chain-back-up case.
        if ((node_to_remove != this.head) && (node_to_remove != this.tail))
        {

            // Since we've established this Node is connected
            // to two other Nodes, we need access to the node
            // in the LinkedList that has this Node in its
            // next_node attribute. There is no previous_node
            // attribute, because that would be a DoublyLinkedList.
            previous_node = this.find_previous_node(node_to_remove);

            // Reassignment of node references
            // maintains the linked list property.
            previous_node.next_node = node_to_remove.next_node;

        }

        else if (node_to_remove === this.tail)
        {

            previous_node = this.find_previous_node(node_to_remove);

            previous_node.next_node = null;

            this.tail = previous_node;

        }

        else if (node_to_remove === this.tail)
        {

            this.head = node_to_remove.next_node

        }

        // Cleaning the removed node's next_node
        // prevents its erroneous use elsewhere.
        node_to_remove.next_node = null;

        this.deleted_node_count += 1;

    };

    this.find_previous_node = function(node_to_find_previous_node_for) {

        node_to_check = this.head;

        while (node_to_check.next_node != node_to_find_previous_node_for)
        {

            // This conditional catches cases
            // where there's only a head node
            // in the LinkedList as well as
            // cases where the chain was
            // improperly broken.
            if (node_to_check.next_node === null)
            {
                return null;
            }

            node_to_check = node_to_check.next_node;

        }

        return node_to_check;

    };

}

// Rudimentary tests. I'm checking it with Node.

// Testing the LinkedList constructor:
var new_linked_list = new LinkedList();

// Initializing a LinkedList with insert:

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


// Testing LinkedList.pop:

// console.log('\nnew_linked_list.pop();\n');
// returned_val = new_linked_list.pop();
// console.log(new_linked_list);
// console.log(new_linked_list.head);
// console.log(new_linked_list.tail);
// console.log(returned_val);

// console.log('\nnew_linked_list.pop();\n');
// returned_val = new_linked_list.pop();
// console.log(new_linked_list);
// console.log(new_linked_list.head);
// console.log(new_linked_list.tail);
// console.log(returned_val);

// console.log('\nnew_linked_list.pop();\n');
// returned_val = new_linked_list.pop();
// console.log(new_linked_list);
// console.log(new_linked_list.head);
// console.log(new_linked_list.tail);
// console.log(returned_val);


// Testing LinkedList.search:

// console.log('\nnew_linked_list.search(6);\n');
// returned_node = new_linked_list.search(6);
// console.log(returned_node);

// console.log('\nnew_linked_list.search(\'six\');\n');
// returned_node = new_linked_list.search('six');
// console.log(returned_node);


// Testing LinkedList.remove:

console.log('\nnew_linked_list.head.val = ' + new_linked_list.head.val);
console.log('\nnew_linked_list.head.next_node.val = ' + new_linked_list.head.next_node.val);
console.log('\nnew_linked_list.tail.val = ' + new_linked_list.tail.val + '\n');

node_to_delete = new_linked_list.search(6);
console.log('\nnode_to_delete =' + node_to_delete);

console.log('\nnode_to_delete.next_node = ' + node_to_delete.next_node);
attempted_node_search_results = new_linked_list.search(6);
console.log('\nattempted_node_search_results = ' + attempted_node_search_results + '\n');


console.log('new_linked_list.remove(node_to_delete);\n');
new_linked_list.remove(node_to_delete);
console.log('\nnew_linked_list = ' + new_linked_list);
console.log('\nnode_to_delete.next_node = ' + node_to_delete.next_node);
attempted_node_search_results = new_linked_list.search(6);
console.log('\nattempted_node_search_results = ' + attempted_node_search_results + '\n');

console.log('\nnew_linked_list.head.val = ' + new_linked_list.head.val);
console.log('\nnew_linked_list.head.next_node.val = ' + new_linked_list.head.next_node.val);
console.log('\nnew_linked_list.tail.val = ' + new_linked_list.tail.val + '\n');
