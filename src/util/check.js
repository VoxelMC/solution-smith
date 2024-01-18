// NOTE: This stores the logic to run a python script, then check if the last output of the script is the correct answer.
// This will be done by encrypting the last output using the encrypt function, then comparing to the problem's answer in the config. Somehow, we will need to know which problem to check!
// Perhaps we can parse this from the problem number, or have the check command take in the problem index, rather than the problem file name.
// For example: pnpm check 1 => runs "problem-1.py" and records the output. Then, split by newline, and get last index.
