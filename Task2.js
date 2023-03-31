const roomsHashTable = {};

const getNumbersFromString = (str) => {
  if (!str) {
    return;
  }

  return Number(str.trim().replace(/^\D+/g, ""));
};

const getCurrencyFromString = (str) => {
  if (!str) {
    return;
  }

  return str.trim().replace(/[\d]/g, "");
};

const refreshRoomsHashTable = () => {
  let currentRoomId = "";
  let currentRoomName = "";

  const allRooms = document.getElementsByClassName("e2e-hprt-table-row");
  for (const room of allRooms) {
    const blockid = room.getAttribute("data-block-id").split("_")[0];
    if (blockid !== currentRoomId) {
      currentRoomId = blockid;
      currentRoomName = document
        .getElementById(`room_type_id_${currentRoomId}`)
        .getElementsByClassName("hprt-roomtype-icon-link")[0]
        .innerHTML.trim()
        .toLowerCase();
    }
    if (!roomsHashTable[currentRoomName]) {
      roomsHashTable[currentRoomName] = {
        cheapest: undefined,
        lowestPrice: Infinity,
        currency: "",
      };
    }
    const currentPrice = getNumbersFromString(
      room.getElementsByClassName("prco-valign-middle-helper")[0].innerHTML
    );
    const currency = getCurrencyFromString(
      room.getElementsByClassName("prco-valign-middle-helper")[0].innerHTML
    );
    if (roomsHashTable[currentRoomName].lowestPrice > currentPrice) {
      roomsHashTable[currentRoomName].lowestPrice = currentPrice;
      roomsHashTable[currentRoomName].currency = currency;
      roomsHashTable[currentRoomName].cheapest = room.querySelector(
        `select[data-room-id="${currentRoomId}"]`
      );
    }
  }
  return roomsHashTable;
};

const getSelectedRoom = (roomName) => {
  if (!roomName) {
    return;
  }
  const trimmedRoomName = roomName.trim().toLowerCase();
  if (!roomsHashTable[trimmedRoomName]) {
    refreshRoomsHashTable();
  }
  return roomsHashTable[trimmedRoomName];
};

const reserveCheapestRoom = (roomName, numberOfRooms) => {
  const roomsToReserve = numberOfRooms || 1;
  const room = getSelectedRoom(roomName);
  if (!room) {
    console.log("no room with the selected name");
    return;
  }
  const reserveBtn = document.getElementsByClassName(
    "js-reservation-button"
  )[0];

  const selectedRoomSelect = room.cheapest;
  selectedRoomSelect.value = roomsToReserve;
  selectedRoomSelect.dispatchEvent(new Event("change"));
  console.log(
    `You Selected: ${roomsToReserve} x ${roomName} with Price: ${
      room.lowestPrice * roomsToReserve
    } in Currency: ${room.currency}`
  );
  setTimeout(() => {
    reserveBtn.click();
  }, 100);
};