## Telemetry Log Parser

Node Script to parse telemetry log files

---

### Prerequisites

| Dependencies | Version |
| :--- | ------- |
| **Node JS** | > 8.x.x |

### Project Setup

1. Clone project

2. Navigate to **telemetry-log-parser** folder

3. Install required dependencies

    > npm install

### Running Script

1. Navigate to project folder

   ```console
   cd telemetry-log-parser
   ```

2. Execute `parser.js` with folder path - _Folder path where file(s) are to be parsed_

3. Example - node parser.js <PATH_TO_DATA_FOLDER>

   ```console
   node parser.js /user/telemetry/logs/
   ```

4. All file(s) under `/logs` will be parsed and stored under /user/telemetry/logs/output/
