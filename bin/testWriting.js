#!/usr/bin/env node
const {buildXml} = require("../src/index");

const testObj = {
    prospects: [{
        requestDate: "2000-03-30T15:30:20-08:00",
        id: {val: 1, source: "fetch-auto"},
        customer: {
            contact: {
                name: {type: "full", val: "Graham Coombe"},
                email: "graham@fetchauto.ca",
                phone: {val: "778-389-4474", time: "evening"},
                address: {
                    line1: "1133 homer st",
                    city: "Vancouver",
                    regioncode: "BC",
                    postalcode: "V6B0b1"
                }
            },
            comments: "Ready for a loan!"
        },
        vendor: {
            name: "Fetch Auto",
            url: "https://fetchauto.ca",
            contact: {
                name: "Graham Coombe",
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

const xml = buildXml(testObj);

console.log("Created xml:");
console.log(xml.end());

process.exit(0);

