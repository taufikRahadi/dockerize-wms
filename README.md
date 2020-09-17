## WMS With Docker-Compose

<hr />

### Services
  - wms-db
    - mysql:5.7
    - environment
      - root password
      - db name
  
  - wms-backend
    - dapetin dockerfile image dari ./wms-backend
    - connect ke wms-db pake host wms-db
    - dockerignore node_modules (kalo ga diignore bakalan error di mysql nya)
  
  - wms-frontend
    - dockerfile dari ./wms-frontend
    - ada 3 stage di imagenya
      - develop-stage (tambahin command yarn serve di docker-compose nya)
      - build-stage (cuma buat nge build)
      - production-stage (copy hasil build dari build-stage, trus masukin ke directory nginx)
    - kalo mau ubah ke develop-stage, ubah aja value di build.target di dalem docker-compose, trus tambahin dibawahnya command: /bin/sh/ -c "yarn serve"
    - port nginx 80 tapi di docker-compose yg diekspos port 8080

docker-compose otomatis nge buat docker network, yang mana isinya nanti adalah ke tiga service diatas, makanya yg saya akses di db host backend nya tu nama service nya.

how to run
  1. masuk ke root folder project ni.
  2. jalanin command:
  ```bash
  $ docker-compose up --force-recreate
  ```
  3. masuk ke shell wms-backend, trus jalanin command buat migrate db
  ```bash
  # masuk ke shell
  $ docker-compose exec wms-backend /bin/sh
  # ini udah masuk
  $ yarn sequelize-cli db:migrate
  # jalanin seed
  $ yarn sequelize-cli db:seed:all
  ```
  4. buka http://localhost:8080 di browser.
  5. login

### Problems (solved)
  1. node_modules di wms-backend lupa diignore
    jadinya mysql nya error dan backend nya langsung stop
```bash
Aborted connection 5 to db: 'simplewms' user: 'root' host: '172.21.0.4' (Got an error reading communication packets)
```
