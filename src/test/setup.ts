import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// @testing-library/react does not auto-cleanup in vitest without globals:true
afterEach(() => {
	cleanup();
});
