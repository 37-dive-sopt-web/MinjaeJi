import { getMembersData } from "./storage.js";
import { renderResultTable } from "./renderTable.js";
import { handleSearchMember } from "./searchMember.js";
import { handleAddMember } from "./addMember.js";
import { handleDeleteMember } from "./deleteMember.js";

document.addEventListener("DOMContentLoaded", () => {
  const membersData = getMembersData();
  renderResultTable(membersData);

  handleSearchMember(renderResultTable);
  handleAddMember(renderResultTable);
  handleDeleteMember(renderResultTable);
});
