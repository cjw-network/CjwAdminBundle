# CJW Admin for eZ Publish/eZ Platform

**Please note: CJW Admin for eZ Publish/eZ Platform is a technology study only.**

**DO NOT USE FOR PRODUCTION !!!**

## Installation

Note: The bundle has been developed and tested unter eZ Publish 5.4/2014.11. Tests with eZ Platform 1.8 were very limited, but promising.

### Download

Clone or unzip into directory

```
src/Cjw/AdminAppBundle
```

### Activate Bundle

Activate the bundle by adding the following line to `EzPublishKernel.php`  (eZ Publish 5.4/2014.11) or `AppKernel.php` (eZ Platform 1.8):

```php
...
new \Cjw\AdminAppBundle\CjwAdminAppBundle(),
...
```

### Add CJW Admin Routes

Add the follwing lines to `ezpublish/config/routing.yml` (eZ Publish 5.4/2014.11) or `app/config/routing.yml` (eZ Platform 1.8):

```yml
_cjw_admin_app:
    resource: "@CjwAdminAppBundle/Resources/config/routing.yml"
```

### Check security.yml

Check `ezpublish/config/security.yml` (eZ Publish 5.4/2014.11) or `app/config/security.yml` (eZ Platform 1.8) and modify it if necessary.

The `firewall/ezpublish_rest` section should be commented out.

```yml
#        ezpublish_rest:
#            pattern: ^/api/ezp/v2
#            stateless: true
#            ezpublish_http_basic:
#                realm: eZ Publish REST API
```

The `firewall/ezpublish_front` section should read:

```
        ezpublish_front:
            pattern: ^/
            anonymous: ~
            ezpublish_rest_session: ~
            form_login:
                require_previous_session: false
            logout: ~
```

### Install Assets, Clear Cache

eZ Publish 5.4/2014.11

```
$ php ezpublish/console assets:install --symlink
$ php ezpublish/console cache:clear
```

eZ Platform 1.8

```
$ php ezpublish/console assets:install --symlink
$ php ezpublish/console cache:clear
```

### Using CJW Admin

You invoke CJW Admin with this URL: `http://<yoursite>/adminapp`

_Note: you may get a Symfony Login prompt before the CJW Admin Login page is presented._

Use your normal credentials- CJW Admin honours a subset of roles, e.g. for creating new objects.

