export const success = (status: number, message: string, data?: any) => {
  return {
    status,
    success: true,
    message,
    data,
  };
};

export const success2 = (status: number, message: string, data?: any) => {
  const topKey = ["topLength", "shoulder", "chest"];
  const bottomKey = ["bottomLength", "waist", "thigh", "rise", "hem"];
  let top: any = {};
  let bottom: any = {};

  Object.entries(data[0]).forEach(([key, value]) => {
    if (topKey.includes(key)) {
      top[key] = value;
    }
  });
  Object.entries(data[0]).forEach(([key, value]) => {
    if (bottomKey.includes(key)) {
      bottom[key] = value;
    }
  });

  const topData = {
    top,
  };
  const bottomData = {
    bottom,
  };
  //console.log("top: ", topData);

  /* split
  const dataStr = JSON.stringify(data);

  const arr = dataStr.split("#");

  let data1 = arr[0] + '"}';
  data1 = data1.substring(1);
  console.log(data1);

  data1 = JSON.parse(data1);

  //const data2 = JSON.parse(arr[1]);

  */

  return {
    status,
    success: true,
    message,
    top,
    bottom,
  };
};

export const fail = (status: number, message: string) => {
  return {
    status,
    success: false,
    message,
  };
};
