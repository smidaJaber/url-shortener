import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UrlForm from "./components/URLForm";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen w-full flex items-center justify-center p-4">
				<UrlForm />
			</div>
		</QueryClientProvider>
	);
};

export default App;
