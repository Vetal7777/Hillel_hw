class Group{
    #students = [];
    addStudent(newStudent){
        this.#students.push(newStudent);
    }
    getAverageMark(){
        return this.students
            .reduce(function (acc,elem){
                acc.push(elem.ratings);
                return acc;
            },[])
            .flat()
            .reduce(function (acc,elem){
                acc += elem;
                return acc;
            },0)
            /
            this.students
                .reduce(function (acc,elem){
                    acc.push(elem.ratings);
                    return acc;
                },[])
                .flat()
                .length;
    }
    get students(){
        return this.#students;
    }
}
class Student{
    #name = '';
    #ratings = undefined;
    constructor(name,ratings) {
        this.#name = name;
        this.#ratings = ratings;
    }
    get name(){
        return this.#name;
    }
    get ratings(){
        return this.#ratings;
    }
}

const feGroup = new Group();
const firstStudent = new Student('John Doe', [10, 102, 0]);

feGroup.addStudent( new Student('John Doe', [10, 10, 5, 10]));
feGroup.addStudent(new Student('Alex Smith', [10, 9, 8]));
feGroup.addStudent(new Student('Bob Johnson', [9, 10, 10, 8]));

console.log(feGroup.students); // [{},{},{}]

console.log(feGroup.getAverageMark()); // 9