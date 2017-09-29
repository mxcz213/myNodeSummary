//node js traversal file directory

const fs = require('fs');
const path = require('path');

//获取当前目录绝对路径
var filePath = path.resolve();

//遍历读取文件
const readDirectory = (dirname,fileList) => {
	const files = fs.readdirSync(dirname);
	files.forEach(function(file){
		readFile(file);
	});

	function readFile(file){
		const stats = fs.statSync(path.join(dirname,file));
		if(stats.isDirectory()){
			const fileDir = path.join(dirname,file);
			readDirectory(fileDir,fileList);
		}
		else{
			const obj = {};
			obj.size = stats.size;
			obj.name = file;
			obj.path = path.join(dirname,file);
			fileList.push(obj);
		}
	}
}

const getFileList = (filepath) => {
	const fileList = [];
	readDirectory(filepath,fileList);
	console.log(fileList);
	return fileList;
}

const compareWithSize = (a,b) => {
	return a.size - b.size;
}

//写入读取的文件信息到一个文件里面
const writeFile = (filename,data) => {
	fs.writeFile(filename,data,'utf-8',function(){
		console.log('文件写入成功');
	})
}

const fileListArr = getFileList(filePath);
fileListArr.sort(compareWithSize);
let str = '';

for(let i = 0,l = fileListArr.length; i < l;i++){
	const item = fileListArr[i];
	const describtion = `文件名：${item.name}  文件大小：${item.size}   文件路径：${item.path}`;
	str += describtion + '\n';
}

writeFile('new.txt',str);



