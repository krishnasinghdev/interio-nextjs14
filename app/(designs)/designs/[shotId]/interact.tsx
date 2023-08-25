// const likeHandler = async () => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.API_URL}/shot/like/?shot_id=${router.query.shotId}&v_id=${vendor.v_id}`,
//       {},
//       {
//         headers: {
//           "Authorization ": `Bearer ${vendor.token}`,
//         },
//       },
//     );
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const saveHandler = async () => {
//   try {
//     const { data } = await axios.post(
//       `${process.env.API_URL}/shot/save/?shot_id=${router.query.shotId}&v_id=${vendor.v_id}`,
//       {},
//       {
//         headers: {
//           "Authorization ": `Bearer ${vendor.token}`,
//         },
//       },
//     );
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
