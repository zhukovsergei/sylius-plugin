## Installation Sylius
### Docker
1. docker-compose build
2. docker-compose run --rm php-cli composer install
3. docker-compose run --rm manager-node yarn install

### Database
1. DATABASE_URL=mysql://sylius:sylius@mysqldb:3306/sylius?serverVersion=8&charset=utf8mb4
2. docker-compose run --rm php-cli php bin/console doctrine:mi:mi  
3. docker-compose run --rm php-cli php bin/console doctrine:fixtures:load 
4. docker-compose up -d

## Installation Node
`docker-compose run --rm manager-node npm install @webtoon/psd fs-extra psd`
### Run it [PSD]
` docker-compose run --rm manager-node node psd_extractor.mjs layers.psd`
### Output:
``` 
Total layers found: 5
Inspecting layer: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do, visible: true, kind: undefined
Inspecting layer: triangle_yellow, visible: true, kind: undefined
Inspecting layer: square_red, visible: true, kind: undefined
Inspecting layer: circle_blue, visible: true, kind: undefined
Inspecting layer: green, visible: true, kind: undefined
```

### Run it [PNG]
`docker-compose run --rm manager-node node psd_extractor.mjs mole.png `

### Output:
```
Segment 1 saved at extracted_data/segment_1.png
Segment 2 saved at extracted_data/segment_2.png
Segment 3 saved at extracted_data/segment_3.png
Segment 4 saved at extracted_data/segment_4.png

```
