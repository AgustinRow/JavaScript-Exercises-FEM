function printRecords(recordIds) {
  let foundStudents = findStudentsFromRecordById(recordIds);
  foundStudents.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  foundStudents.forEach((element) => {
    console.log(
      element.name,
      "(",
      element.id,
      ") : ",
      element.paid ? "Paid" : "Not Paid"
    );
  });
}

function findStudentsFromRecordById(recordIds) {
  var result = [];
  recordIds.forEach((element) => {
    result.push(
      studentRecords.find(function getStudent(student) {
        if (student.id === element) {
          return student;
        }
      })
    );
  });
  return result;
}

function paidStudentsToEnroll() {
  var result = [];
  studentRecords.find(function getStudentPaid(student) {
    if (student.paid) {
      result.push(student.id);
    }
  });
  result = [...currentEnrollment, ...result];

  return result.filter((item, index) => result.indexOf(item) === index);
}

function remindUnpaid(recordIds) {
  var students = findStudentsFromRecordById(recordIds);
  var result = students.filter((element) => !element.paid);
  printRecords(result.map((element) => element.id));
}

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
