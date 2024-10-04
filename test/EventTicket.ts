import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre, { ethers } from "hardhat"; 

  describe("EventTicket", function(){

  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  async function deployNFT() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc721NFT = await hre.ethers.getContractFactory("EventNFT");
    const nft = await erc721NFT.deploy();

    return { nft };
  }


  async function deployEventTicket() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const { nft } = await loadFixture(deployNFT);

    const event = await hre.ethers.getContractFactory("EventTicket");
    const eventTicket = await event.deploy(nft);

    return { eventTicket, owner, otherAccount, nft };


  }

  describe("Deployment", function () {

    it("Should check if tokenAddress is correctly set", async function () {
      const { eventTicket, owner, nft } = await loadFixture(deployEventTicket);

      expect(await eventTicket.nftContractAddress()).to.equal(nft);
    });
  });

  // it("Should check if nftContractAddress is correctly set", async function () {
  //   const { eventTicket, owner, nft } = await loadFixture(deployEventTicket);

  //   expect(await eventTicket.nftContractAddress()).to.equal(nft);
  // });

  describe("CreateEvent", function () {
    it("Should check nft owner", async function () {
        const { eventTicket, owner, otherAccount, nft } = await loadFixture(deployEventTicket);

        expect(eventTicket.isNFTOwner(otherAccount)).to.be.revertedWith("Not an nft owner");
    })

    it("should check if the count is greater than 10", async function () {
        const {eventTicket, owner} = await loadFixture(deployEventTicket);
        const { nft } = await loadFixture(deployNFT);
        const url = "ipfs://QmQsbncZwMMpBbcDuvTx5Hq4K6rV2nrqHm8CMtt3DGZAnH";

        await nft.mint(owner,url);

        const name = "name";
        const description = "decription";
        for (let i = 0; i < 9; i++) {
            await eventTicket.connect(owner).createEvent(name,description);
        }

        // Create the 10th event
        await eventTicket.connect(owner).createEvent(name,description); 

        expect(await eventTicket.connect(owner).createEvent(name,description)).to.be.revertedWith("Maximum event limit reachedd");

    });


    // it("Should create event successfully", async function () {
    //   const { eventTicket, owner, otherAccount, nft } = await loadFixture(deployEventTicket);

    //   // Transfer erc20 tokens from the owner to otherAccount
    //   const trfAmount = ethers.parseUnits("100", 18);
    //   await token.transfer(otherAccount, trfAmount);
    //   expect(await token.balanceOf(otherAccount)).to.equal(trfAmount);

    //   // using otherAccount to approve the SaveErc20 contract to spend token
    //   await token.connect(otherAccount).approve(saveErc20, trfAmount);

    //   const otherAccountBalBefore = await token.balanceOf(otherAccount);

    //   const depositAmount = ethers.parseUnits("10", 18);

    //   // Using the otherAccount to call the deposit function
    //   await saveErc20.connect(otherAccount).deposit(depositAmount);

    //   expect(await token.balanceOf(otherAccount)).to.equal(otherAccountBalBefore - depositAmount);

    //   expect(await saveErc20.connect(otherAccount).myBalance()).to.equal(depositAmount);
    //   expect(await saveErc20.getContractBalance()).to.equal(depositAmount);
    });


  })