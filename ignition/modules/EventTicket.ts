
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTcontractaddress = "0xd77928b867a3cd84f40494Cb0Ce737C009a0365f";

const EventTicketModule = buildModule("EventTicketModule", (m) => {


  const EventTicket = m.contract("EventTicket", [NFTcontractaddress])

  return { EventTicket };
});

export default EventTicketModule;
