import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant";

const ShowAllVotes = () => {
  const navigate = useNavigate();
  const electionName = useParams().name;
  const { data } = useReadContract({
    functionName: "getAllVoteOfElection",
    abi: abi,
    address: contractAddress,
    args: ["0x28FB17368f0E417ED29BE05E9991b16e776b10a0", electionName],
  });
  useEffect(() => {}, [data]);
  return (
    <div>
      <h1>All votes of {electionName}</h1>
      {data ? (
        data.map((vote, index) => {
          return (
            <div key={index}>
              <p>
                voter {index + 1} is {vote.voter}
              </p>

              <p>vote for {vote.optionChosen}</p>
              <hr />
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default ShowAllVotes;
