import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const address = 0x28fb17368f0e417ed29be05e9991b16e776b10a0;
  const { data } = useReadContract({
    functionName: "getAllElections",
    abi: abi,
    address: contractAddress,
    args: ["0x28FB17368f0E417ED29BE05E9991b16e776b10a0"],
  });
  useEffect(() => {}, [data]);

  return (
    <div>
      {data?.length ? (
        data.map((election, index) => {
          return (
            <div key={index}>
              {election}{" "}
              <button
                onClick={() => {
                  navigate(`/vote/${election}`);
                }}
              >
                Vote
              </button>{" "}
              <button
                onClick={() => {
                  navigate(`/showAllVote/${election}`);
                }}
              >
                Get All Votes
              </button>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Home;
