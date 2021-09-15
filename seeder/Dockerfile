FROM mongo:4.4
COPY affirmations.csv /affirmations.csv
CMD mongoimport --uri "mongodb://mongo_db_affirm" --db=affirm --collection=affirmations --type=csv --columnsHaveTypes --fields="body.string()" --file=/affirmations.csv && rm /affirmations.csv