// importing the required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");

/**
 * @summary The function adds a new employee to a list of buddies if their employee ID does not already exist in
 * the list.
 * @param data - The `data` parameter is an object that represents the information of a new employee to
 * be added to the list of buddies.
 * @returns The function `addBuddy` returns an object with a `status` and `data` property. The value of
 * the `status` property depends on the outcome of the function. If the employee is successfully added,
 * the `status` property will be `201` and the `data` property will be `"Employee Added"`. If the
 * employee already exists, the `status` property will be `403`.
 * @author @karthikeyan-cdw
 */
const addBuddy = (data) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  if (!buddies.data.some((buddy) => buddy.employeeId === data.employeeId)) {
    buddies.data.push(data);
    let result = writeJSON(buddies.data);
    if (result.status === 200) return { status: 201, data: "Employee Added" };
    return result;
  }
  return { status: 403, data: "Employee Id Already Exists" };
};

/**
 * @summary The function returns all buddies from a JSON file.
 * @returns The function `getAllBuddies` is returning the value of the `buddies` variable, which is the
 * result of calling the `readJSON` function. The exact value returned depends on the implementation of
 * the `readJSON` function.
 * @author @karthikeyan-cdw
 */
const getAllBuddies = () => {
  let buddies = readJSON();
  return buddies;
};

/**
 * @summary The function retrieves a buddy's information based on their employee ID.
 * @param empId - The empId parameter is a variable that represents the employee ID of the buddy that
 * we want to retrieve from the JSON data.
 * @returns The function `getBuddy` returns an object with a `status` property and a `data` property.
 * The `status` property indicates the status of the operation (either 200 for success or 404 for
 * failure), and the `data` property contains either the buddy object (if the operation was successful)
 * or an error message (if the operation failed).
 * @author @karthikeyan-cdw
 */
const getBuddy = (empId) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let buddy = buddies.data.find((buddy) => buddy.employeeId == empId) || [];
  if (buddy.length === 0) return { status: 404, data: "Employee Not Found" };
  return { status: 200, data: buddy };
};

/**
 * @summary The function updates employee information in a JSON file, with restrictions on certain fields.
 * @param empId - empId is the employee ID of the buddy whose information needs to be updated.
 * @param newData - `newData` is an object containing the updated information for an employee. The keys
 * of the object represent the fields to be updated, and the values represent the new values for those
 * fields.
 * @returns an object with a `status` property and a `data` property. The value of the `status`
 * property indicates the status of the operation (200 for success, 403 for forbidden, 404 for not
 * found, or 500 for server error), and the value of the `data` property provides additional
 * information about the operation (e.g. a success message or an error.
 * @author @karthikeyan-cdw
 */
const updateBuddy = (empId, newData) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let buddyIndex = buddies.data.findIndex(
    (buddy) => buddy.employeeId === empId
  );

  if (buddyIndex != -1) {
    let isModifiable = true;
    const shouldNotModify = ["employeeId", "realName", "dob"];
    for (let key in Object(newData)) {
      if (shouldNotModify.includes(key)) {
        isModifiable = false;
        break;
      } else {
        buddies.data[buddyIndex][key] = newData[key];
      }
    }
    if (isModifiable === false) {
      return { status: 403, data: "Can't Update Some Data" };
    }
    let result = writeJSON(buddies.data);
    if (result.status === 200)
      return { status: 200, data: "Employee Information Updated" };
    return result;
  }
  return { status: 404, data: "Employee Not Found" };
};

/**
 * @summary The function deletes an employee from a list of buddies and returns a success message if the
 * employee is found and deleted, or a failure message if the employee is not found.
 * @param empId - empId is the employee ID of the buddy that needs to be deleted from the list of
 * buddies.
 * @returns The function `deleteBuddy` returns an object with a `status` and `data` property. The
 * `status` property can be either 200 or 404. If the `status` is 200, it means that the employee was
 * successfully deleted and the `data` property will contain the string "Employee Deleted". If the
 * `status` is 404, it means that the employee not found.
 * @author @karthikeyan-cdw
 */
const deleteBuddy = (empId) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let intialBuddiesLength = buddies.data.length;
  buddies = buddies.data.filter((buddy) => buddy.employeeId !== empId);
  if (intialBuddiesLength !== buddies.length) {
    let result = writeJSON(buddies);
    if (result.status === 200) return { status: 200, data: "Employee Deleted" };
    return result;
  }
  return { status: 404, data: "Employee Not Found" };
};

module.exports = {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
};
