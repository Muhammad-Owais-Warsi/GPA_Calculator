import React, { useState,useEffect } from 'react';
import { Toaster, toast } from 'sonner'


export default function Options() {


    const defaultCreditValue = 0;
    const defaultGradeValue = 'O';
    const grade_points = {
        "O": 10,
        "A+": 9,
        "A": 8,
        "B+": 7,
        "B": 6,
        "C": 5.5,
        "W": 0,
        "F": 0,
        "AB": 0,
        "I": 0,
        "*": 0
    };
    
    const length = 5;


    const [rows, setRows] = useState(Array.from({ length: length }, () => ({ credits: defaultCreditValue, grade: defaultGradeValue })));
    const [result, setResult] = useState();

    const handleAddMember = () => {

        setRows(prevRows => [...prevRows, { credits: defaultCreditValue, grade: defaultGradeValue }]);

    };

    const handleCreditChange = (index, value) => {
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].credits = value;
            return updatedRows;
        });
    };

    const handleGradeChange = (index, value) => {
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].grade = value;
            return updatedRows;
        });
    };

 

    const calculate = () => {
        let totalCredits = 0;
        let totalGradePoints = 0;

        // rows.forEach(({ credits, grade }) => {
        //     if(credits === null || credits === 0) {
        //         toast.warning('Missig Fields')
        //         return ;
        //     }
        //     totalCredits += parseInt(credits); // Convert credits to integer
        //     totalGradePoints += parseInt(credits) * parseInt(grade_points[grade]);
        //     console.log(credits, grade_points[grade])
        // });
        for (const { credits, grade } of rows) {
            if (credits === null || credits === 0 ) {
                toast.warning('Missing Fields');
                setResult('')
                return;
            }
            totalCredits += parseInt(credits);
            totalGradePoints += parseInt(credits) * parseInt(grade_points[grade]);
            console.log(credits, grade_points[grade]);
        }




        const gpa = totalGradePoints / totalCredits;
        console.log(totalCredits, totalGradePoints)
        console.log(gpa);
        if(isNaN(gpa)) {
            toast.warning("Missing Fields")
            setResult('');
        } else {
            setResult(gpa.toFixed(2));
        }
    };













    return (


        <div className="overflow-hidden">
            <Toaster position='top-center' richColors expand={false}/>
            <table className="table">
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    placeholder="Credits"
                                    className="input w-full max-w-xs select-bordered"
                                    type="number"
                                    value={null}
                                    min={1}
                                    onChange={(e) => handleCreditChange(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    value={row.grade}
                                    onChange={(e) => handleGradeChange(index, e.target.value)}
                                >
                                    <option value="O">O</option>
                                    <option value="A+">A+</option>
                                    <option value="A">A</option>
                                    <option value="B+">B+</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="W">W</option>
                                    <option value="F">F</option>
                                    <option value="AB">AB</option>
                                    <option value="I">I</option>
                                    <option value="*">*</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex mb-8 justify-center items-center'>
                <button className="btn btn-wide btn-outline btn-warning " onClick={handleAddMember}>Add Course</button>
            </div>
            <div className='flex justify-center items-center'>
                <button className="btn w-6/12 btn-outline btn-success" onClick={calculate}>Calculate</button>
            </div>
            <div className="flex justify-center items-center font-extrabold text-3xl">
                <div>
                    {result && (
                        <div className='text-[#A6ADBB]  mt-8 mb-16'>
                            <p>
                                Your CGPA: <span>{result}</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>





            <footer className="fixed bottom-0 w-full bg-neutral p-2 text-neutral-content flex justify-between items-center">
                <div className="flex items-center">
                    <p>Made by Owais & Deboneil - 2023</p>
                </div>
                <nav className="flex items-center">
                    <a href="https://github.com/Muhammad-Owais-Warsi/GPA_Calculator">                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                        <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.208 11.385.6.111.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.615-4.042-1.615-.546-1.385-1.333-1.754-1.333-1.754-1.088-.742.083-.728.083-.728 1.205.085 1.838 1.235 1.838 1.235 1.07 1.837 2.805 1.305 3.49.998.108-.776.42-1.306.763-1.605-2.67-.303-5.467-1.336-5.467-5.93 0-1.31.465-2.383 1.236-3.223-.124-.303-.54-1.526.117-3.176 0 0 1.007-.322 3.3 1.23a11.53 11.53 0 0 1 3-.406c1.017.006 2.037.137 3 .406 2.29-1.552 3.295-1.23 3.295-1.23.66 1.65.245 2.873.12 3.176.77.84 1.234 1.913 1.234 3.223 0 4.608-2.8 5.623-5.476 5.917.43.372.814 1.102.814 2.222 0 1.605-.015 2.896-.015 3.287 0 .32.215.694.825.576C20.566 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12"></path>
                    </svg></a>

                </nav>
            </footer>


        </div>


    );
}
