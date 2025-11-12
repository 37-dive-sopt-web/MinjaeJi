import { getMembersData } from "./features/storage.js";
import { renderResultTable } from "./features/renderTable.js";
import { handleSearchMember } from "./features/searchMember.js";
import { handleAddMember } from "./features/addMember.js";
import { handleDeleteMember } from "./features/deleteMember.js";
import { handleCustomDropDown } from "./features/customDropDown.js";

document.addEventListener("DOMContentLoaded", () => {
  const membersData = getMembersData();
  renderResultTable(membersData);

  handleSearchMember(renderResultTable);
  handleAddMember(renderResultTable);
  handleDeleteMember(renderResultTable);

  handleCustomDropDown();
});
