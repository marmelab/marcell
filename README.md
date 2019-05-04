<table>
        <tr>
            <td><img width="20" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/archive.svg" alt="archived" /></td>
            <td><strong>Archived Repository</strong><br />
            This code is no longer maintained. Feel free to fork it, but use it at your own risks.
        </td>
        </tr>
</table>

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

