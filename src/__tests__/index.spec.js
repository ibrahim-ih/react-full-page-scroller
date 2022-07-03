import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Index from "../index";

describe("index", () => {
    it("renders without crashing", () => {
        const { container } = render(<Index />);
        expect(container).toBeInTheDocument();
    });
    }
);
