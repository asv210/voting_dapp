import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../utils/Constant";

const Vote = () => {
  const name = useParams().name;
  const navigate = useNavigate();
  const { data: hash, error, writeContract, isPending } = useWriteContract();
  const [selectedOptions, setSelectedOptions] = useState("");
  const { data } = useReadContract({
    functionName: "getElection",
    abi: abi,
    address: contractAddress,
    args: ["0x28FB17368f0E417ED29BE05E9991b16e776b10a0", name],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOptions === "") {
      alert("please select  an option to vote!");
      return;
    }
 
    const addressToVote = "0x28fb17368f0e417ed29be05e9991b16e776b10a0";

    try{
      writeContract({
      address: contractAddress,
      abi: abi,
      functionName: "vote",
      args: [addressToVote, name, selectedOptions],
    })
      
        setSelectedOptions("");
        alert(`Voted for ${selectedOptions}`);
        navigate("/");
   }
      catch(error)  {
        console.error("Error:", error);
      };
  };
  useEffect(() => {}, [data]);

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.electionName}</h2>
          <form onSubmit={handleSubmit}>
            {data.options ? (
              data.options.map((option, index) => {
                return (
                  <div>
                    <input
                      type="radio"
                      id={`option${option}`}
                      key={index}
                      name="option"
                      onChange={() => {
                        setSelectedOptions(option);
                      }}
                    />
                    <label
                      htmlFor={`option${option}`}
                    >{`Option ${option}`}</label>
                    <br />
                  </div>
                );
              })
            ) : (
              <p>No options</p>
            )}
            <button type="submit" disabled={data.options.length < 1}>
              VOTE
            </button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Vote;
