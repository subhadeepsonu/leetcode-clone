import axios from "axios";
import { createClient } from "redis";

async function slave() {
    const client = createClient();
    await client.connect();
    while (true) {
        try {
            const submissions = await client.brPop("submissions", 0);
            if (submissions) {
                const recived_body = JSON.parse(submissions.element);
                console.log(recived_body)
                let result = {
                    passedCases: 0,
                    failedCases: 0,
                    totalCases: recived_body.testcases.length,
                    correct: false,
                    userId: recived_body.userId
                };

                await Promise.all(
                    recived_body.testcases.map(async (testcase: any) => {
                        let code = "const input=require('fs').readFileSync('/dev/stdin').toString().trim();const [a, b] = input.split(',');" + recived_body.code
                        const body = {
                            language_id: parseInt(recived_body.langId),
                            source_code: code,
                            stdin: testcase.input,
                            expected_output: testcase.output,
                        };
                        try {
                            const response = await axios.post("http://3.110.188.231:2358/submissions", body, {
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            const resposne2 = await axios.get(`http://3.110.188.231:2358/submissions/${response.data.token}`);
                            console.log(resposne2.data)
                            if (resposne2.data.status.description === "Accepted") {
                                result.passedCases += 1;
                            } else {
                                result.failedCases += 1;
                            }
                        } catch (err) {
                            console.error("Error processing submission:", err);
                            result.failedCases += 1;
                        }
                    })
                );
                result.correct = (result.passedCases == result.totalCases) ? true : false
                try {
                    await axios.put(`http://localhost:3000/api/v1/submission/${recived_body.submissionId}`, {
                        passedcases: result.passedCases,
                        failedcases: result.failedCases,
                        totalcases: result.totalCases,
                        correct: result.correct,
                        userId: recived_body.userId
                    });
                } catch (err: any) {
                    console.error("Error updating submission result:", err.response?.data || err.message || err);
                }
            }
        } catch (error: any) {
            console.error("Error:", error.message);
            await client.quit();
            break;
        }
    }
}

slave();
