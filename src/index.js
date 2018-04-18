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
    addProvider(prospect.vendor, builder).up();
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

    builder.ele("contact")
        .addADFNodeAndUp("name", customer.contact.name)
        .addADFNodeAndUp("email", customer.contact.email)
        .addADFNodeAndUp("phone", customer.contact.phone);
    addAddress(customer.contact.address, builder).up().up();

    builder.ele("comments")
        .dat(`
            employer: Telus
            employment_status: Full time
            occupation: Customer service rep
            months_at_employer: 1
            years_at_employer: 2
            monthly_income: $4,000
            rent_or_own: own
            monthly_housing_payment: $1000
            months_at_residence: 2
            years_at_residence: 2
            date_of_birth: 1988-02-19
          `).up();
    return builder;
};

const addProvider = (vendor, builder) => {
    builder.ele("vendor")
        .addADFNodeAndUp("vendorname", vendor.name)
        .addADFNodeAndUp("url", vendor.url);


    return builder.ele("contact")
        .addADFNodeAndUp("name", vendor.contact.name)
        .addADFNodeAndUp("email", vendor.contact.email)
        .addADFNodeAndUp("phone", vendor.contact.phone)
        .ele("address")
        .addADFNodeAndUp("street",{ line: 1}, vendor.contact.address.line1)
        .addADFNodeAndUp("city", vendor.contact.address.city)
        .addADFNodeAndUp("regioncode", vendor.contact.address.regioncode)
        .addADFNodeAndUp("postalcode", vendor.contact.address.postalcode)
        .addADFNodeAndUp("country", vendor.contact.address.country).up().up();


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