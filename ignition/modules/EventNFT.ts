import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EventNFTmodule = buildModule("EventNFTmodule", (m) => {

    const save = m.contract("EventNFT", []);

    return { save };
});

export default EventNFTmodule;