import React from "react";
import PropTypes from "prop-types";
import {getValidChildren} from "../helper";


describe("helper", () => {
    it("returns valid children", () => {
        const children = <div key=".$1">Hello</div>;
        const result = getValidChildren(children);
        // TODO: fix this test
      //  expect(result).toEqual([<div key=".$1">Hello</div>]);
    });
    }
);
