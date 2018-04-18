const {getXmlString} = require("../src");
const chai = require("chai");
const expect  = require('chai').expect;
const chaiXml = require('chai-xml');

chai.use(chaiXml);

const testObj = {
    prospects: [{
        requestDate: "2018-04-12T16:30:20-07:00",
        id: {val: 1234, source: "fetch-auto"},
        customer: {
            contact: {
                name: {val: "Peter Smith"},
                email: "support@fetchauto.ca",
                phone: {val: "6041234567", time: "afternoon"},
                address: {
                    line1: "123 Main st.",
                    city: "Vancouver",
                    regioncode: "BC",
                    postalcode: "V7Z5B6"
                }
            },
            commentsData: {
                employer: "Telus",
                employment_status: "Full time",
                occupation: "Customer service rep",
                months_at_employer: 1,
                years_at_employer: 2,
                monthly_income: "$4,000",
                rent_or_own: "own",
                monthly_housing_payment: "$1,000",
                months_at_residence: 2,
                years_at_residence: 2,
                date_of_birth: "1988-02-19"
            }
        },
        vendor: {
            name: "Fetch Auto",
            url: "https://fetchauto.ca",
            contact: {
                name: "Drew Gamble",
                email: "dealership.support@fetchautp.ca",
                phone: "1-888-755-4460",
                address: {
                    line1: "300-1090 Homer St",
                    city: "Vancouver",
                    regioncode: "BC",
                    postalcode: "V6B0B1",
                    country: "CA"
                }
            }

        }
    }]
};

const expectedXML = `<?xml version="1.0"?><?ADF VERSION="1.0"?><adf><prospect><id source="fetch-auto">1234</id><requestdate>2018-04-12T16:30:20-07:00</requestdate><vehicle><year/><make/><model/></vehicle><customer><contact><name>Peter Smith</name><email>support@fetchauto.ca</email><phone time="afternoon">6041234567</phone><address><street line="1">123 Main st.</street><city>Vancouver</city><regioncode>BC</regioncode><postalcode>V7Z5B6</postalcode><country>CA</country></address></contact><comments><![CDATA[
            employer: Telus
            employment_status: Full time
            occupation: Customer service rep
            months_at_employer: 1
            years_at_employer: 2
            monthly_income: $4,000
            rent_or_own: own
            monthly_housing_payment: $1,000
            months_at_residence: 2
            years_at_residence: 2
            date_of_birth: 1988-02-19
          ]]></comments></customer><vendor><vendorname>Fetch Auto</vendorname><url>https://fetchauto.ca</url><contact><name>Drew Gamble</name><email>dealership.support@fetchautp.ca</email><phone>1-888-755-4460</phone><address><street line="1"/><city>Vancouver</city><regioncode>BC</regioncode><postalcode>V6B0B1</postalcode><country>CA</country></address></contact></vendor></prospect></adf>`;


describe("adf-leads", function () {
    it("Creates an xml string correctly", function () {
        expect(expectedXML).xml.to.deep.equal(getXmlString(testObj));
    });
});