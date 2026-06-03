/*import bcrypt from "bcryptjs";

const generateHash = async () => {
    const hash = await bcrypt.hash("admin123", 10);
    console.log(hash);
};

generateHash();*/
// test.js
/*import bcrypt from "bcryptjs";

const hash =
    "$2b$10$MDbdkc/QIbDK/ebMUHS3xOZvD9GVXeZbWlt/GnsI9YkQg/rEkDWG";

const match = await bcrypt.compare(
    "admin123",
    hash
);

console.log(match);*/

import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("admin123", 10);
console.log(hash);