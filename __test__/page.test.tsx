import { expect, test } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

import Page from "pages/index";

test("Home", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
 // Initial render (wait for data)
 await screen.findByText('Search');

 // Input and button interaction
 const input = screen.getByPlaceholderText('Enter Username'); // Replace with your input's placeholder or label
 fireEvent.change(input, { target: { value: 'github' } });

 const button = screen.getByRole('button', { name: 'Search' }); // Replace with your button's role and name
 fireEvent.click(button);

 // Wait for filtered results
 await waitFor(() => {
   expect(screen.findByText('github')).toBeDefined();
 });
});
