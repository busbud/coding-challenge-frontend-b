import { cp } from "shelljs";

cp('src/server/index.html', 'dist/server/index.html');
cp('-R', 'src/assets', 'dist');
