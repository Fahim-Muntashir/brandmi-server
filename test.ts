// $project: {
//     title: 1,
//     category: 1,
//     packages: {
//         $map: {
//             input: "$packages",
//             as: "pkg",
//             in: {
//                 type: "$$pkg.type",
//                 price: "$$pkg.price"
//             }
//         }
//     }
// }