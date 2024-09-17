// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;
interface IEVNFTContract {
    function balanceOf(address owner) external view returns (uint256);
}

contract EventTicket {
    address public nftContractAddress;
    uint256 public eventCount;

    mapping(uint256 => Event) public events;
    mapping(address => bool) public isNFTOwner;

    struct Event {
        uint256 id;
        string name;
        string description;
        uint256 timestamp;
        address creator;
        bool canceled;
    }

    constructor(address _nftContractAddress) {
        nftContractAddress = _nftContractAddress;
    }

    function createEvent(string memory _name, string memory _description) public {
        require(isNFTOwner[msg.sender], "Only NFT owners can create events");
        require(eventCount < 10, "Maximum event limit reached");

        eventCount++;
        events[eventCount] = Event(eventCount, _name, _description, block.timestamp, msg.sender, false);
    }

    function registerEvent(uint256 _eventId) public view {
    require(isNFTOwner[msg.sender], "Only NFT owners can register for event");
    require(!events[_eventId].canceled, "Event is canceled");

    // Add logic to register the user for the event, e.g., store the user's address in a mapping or list.
}


    function checkNFTOwnership() public {
        require(nftContractAddress != address(0), "NFT contract address not set");

        uint256 balance = IEVNFTContract(nftContractAddress).balanceOf(msg.sender);
        isNFTOwner[msg.sender] = balance > 0;
    }


    function updateEvent(uint256 _eventId, string memory _name, string memory _description) public {
        require(isNFTOwner[msg.sender], "Only event creators can update event");
        require(events[_eventId].creator == msg.sender, "Only event creator can update");

        events[_eventId].name = _name;
        events[_eventId].description = _description;
    }

    function cancelEvent(uint256 _eventId) public {
        require(isNFTOwner[msg.sender], "Only event creators can cancel event");
        require(events[_eventId].creator == msg.sender, "Only event creator can cancel");

        events[_eventId].canceled = true;
    }

}




// function registerEvent(uint256 _eventId) public {
//     require(isNFTOwner[msg.sender], "Only NFT owners can register for event");
//     require(!events[_eventId].canceled, "Event is canceled");

//     // Add logic to register the user for the event, e.g., store the user's address in a mapping or list.
// }