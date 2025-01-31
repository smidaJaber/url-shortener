// src/components/__tests__/UrlForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UrlForm from "../URLForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect, describe, it } from "vitest";
const queryClient = new QueryClient();

describe("UrlForm", () => {
	it("renders the form and submits a URL", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UrlForm />
			</QueryClientProvider>
		);

		const input = screen.getByPlaceholderText("Enter long URL");
		const button = screen.getByText("Shorten");

		fireEvent.change(input, {
			target: { value: "https://www.arcube.org/demo" },
		});
		fireEvent.click(button);

		await waitFor(() => {
			expect(screen.getByText(/Short URL:/)).toBeInTheDocument();
		});
	});
});
