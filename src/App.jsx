import { WagmiProvider, useAccount } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Account } from "./utils/Account";
import { WalletOptions } from "./utils/Wallet-options";
import { config } from "./config/config";
const queryClient = new QueryClient();
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Vote from "./pages/Vote";
import ShowAllVotes from "./pages/ShowAllVotes";
function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vote/:name" element={<Vote />} />
              <Route path="/showAllVote/:name" element={<ShowAllVotes />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
