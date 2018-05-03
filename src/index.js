const XMLBuilder = require("./XMLBuilder");
const {DateTime} = require("luxon");

const addProspect = (prospect, builder) => {
    builder.ele("prospect");

    if (prospect.id) {
        builder.addADFNodeAndUp("id", prospect.id);
    }

    builder.ele("requestdate", DateTime.fromISO(prospect.requestDate).toISO({suppressMilliseconds: true})).up();


    //Adds empty vehicle to pass DTD validation
    builder.ele("vehicle")
        .ele("year", "").up()
        .ele("make", "").up()
        .ele("model", "").up().up();

    addCustomer(prospect.customer, builder).up();
    addVendor(prospect.vendor, builder).up();
    addProvider(prospect.provider, builder).up();
    return builder;

};

const addAddress = (address, builder) => {

    builder.ele("address");

    builder.ele("street", {line: 1}, address.line1).up();

    if (address.line2) {
        builder.ele("street", {line: 2}, address.line2);
    }

    return builder.addADFNodeAndUp("city", address.city)
        .addADFNodeAndUp("regioncode", address.regioncode)
        .addADFNodeAndUp("postalcode", address.postalcode)
        .addADFNodeAndUp("country", "CA");
};

const addCustomer = (customer, builder) => {
    builder = builder.ele("customer");

    builder.ele("contact");

    if (customer.contact.firstName) {
        builder.addADFNodeAndUp("name", {val: customer.contact.firstName, part: "first", type: "individual"});
    }
    if (customer.contact.lastName) {
        builder.addADFNodeAndUp("name", {val: customer.contact.lastName, part: "last", type: "individual"});
    }
    if (customer.contact.name) {
        builder.addADFNodeAndUp("name", {val: customer.contact.name, part: "full", type: "individual"});
    }

    builder.addADFNodeAndUp("email", customer.contact.email)
        .addADFNodeAndUp("phone", customer.contact.phone);

    addAddress(customer.contact.address, builder).up().up();

    if (customer.commentsData){
        let commentsStringBuilder = "";
        for(const [key, value] of Object.entries(customer.commentsData)) {
            commentsStringBuilder += `${key}: ${value}
            `;
        }

        builder.ele("comments")
            .dat(commentsStringBuilder).up();
    }

    return builder;
};

const addVendor = (vendor, builder) => {
    builder.ele("vendor")
        .addADFNodeAndUp("vendorname", vendor.name);

    builder.ele("contact")
        .addADFNodeAndUp("name", {val: vendor.name, type: "business", part: "full"})
        .ele("email", "").up().up();

    return builder;

};

const addProvider = (provider, builder) => {
    builder.ele("provider")
        .addADFNodeAndUp("name", {val: provider.name, type: "business", part: "full"})
        .addADFNodeAndUp("url", provider.url)
        .addADFNodeAndUp("email", provider.contact.email)
        .addADFNodeAndUp("phone", provider.contact.phone);

    builder.ele("contact")
        .addADFNodeAndUp("name", {val: provider.contact.name, type: "individual", part: "full"})
        .addADFNodeAndUp("email", provider.contact.email)
        .addADFNodeAndUp("phone", provider.contact.phone)
        .ele("address")
        .addADFNodeAndUp("street",{ line: 1}, provider.contact.address.line1)
        .addADFNodeAndUp("city", provider.contact.address.city)
        .addADFNodeAndUp("regioncode", provider.contact.address.regioncode)
        .addADFNodeAndUp("postalcode", provider.contact.address.postalcode)
        .addADFNodeAndUp("country", provider.contact.address.country).up().up();


    return builder;
};

const buildXml = obj => {
    const root = XMLBuilder.create("adf")
        .instructionBefore("ADF", "VERSION=\"1.0\"");

    obj.prospects.forEach(prospect => {
        addProspect(prospect, root);
    });

    return root.doc();
};

const getXmlString = obj => {
    return buildXml(obj).end();
};

module.exports = {buildXml, getXmlString};