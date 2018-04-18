//Wrap xmlbuilder to add additional functionality like that in addADFNode while retaining the ability to chain
const xmlbuilder = require("xmlbuilder");

class XMLBuilder {
    constructor(rootNode) {
        this.rootNode = rootNode;
        this.currNode = rootNode;
    }

    static create(name, xmldec, doctype, options) {
        const root = xmlbuilder.create(name, xmldec, doctype, options);
        return new XMLBuilder(root);
    }

    dat(content) {
        this.currNode.dat(content);
        return this;
    }

    addADFNodeAndUp(nodeName, options) {
        if (!options) {
            return this;
        } else if (typeof options === "object") {
            const {val, ...attrs} = options;
            this.ele(nodeName, attrs, val).up();
        } else {
            this.ele(nodeName, options).up();
        }

        return this;
    }

    //Everything below just passes through to xml-builder

    ele(name, attributes, text) {
        this.currNode = this.currNode.ele(name, attributes, text);
        return this;
    }

    up() {
        this.currNode = this.currNode.up();
        return this;
    }

    instructionBefore(target, value) {
        this.currNode = this.currNode.instructionBefore(target, value);
        return this;
    }

    doc() {
        return this.currNode.doc();
    }
}

module.exports = XMLBuilder;