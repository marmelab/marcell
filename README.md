# misocell.io

## Production deployment

Production hosting is done on Amazon S3. You should then have the AWS CLI tool installed:

``` sh
sudo apt-get install python-pip
pip install awscli
```

Then, configure (if not already done) your AWS credentials:

``` sh
aws configure
```

Finally, deploy on production with:

``` sh
make deploy
```

