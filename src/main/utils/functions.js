export const getSameObjectValues = (array1, array2) => {
  return array1.filter((object1) => {
    return array2.some((object2) => {
      if (object2.id) return object1.id === object2.id;
      else return object1.id === object2;
    });
  });
};
