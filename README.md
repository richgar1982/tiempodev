<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>


# System requirements 

<ul>
<li> PHP version 7.3 </li>
<li> Laravel 7.x </li>
<li> npm version 7.0 </li>
</ul>


# Instructions

Just clone the repo using this command: 
```console
$ https://github.com/richgar1982/tiempodev.git
```

Move to the directory:

```console
$ cd tiempodev
```


Install the dependencies using composer: 


```console
$ composer install
```

When you have the code ready on your local, just copy .env.example to a new .env file: 

```console
$ mv .env.example .env
```

Create a new empty databse in mysql. Edit the .env file, and set te properties for the mysql connection. It must look like this: 
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dbname
DB_USERNAME=username
DB_PASSWORD=password
```
Finally, run the migration files to create database structure: 

```console
$ php artisan migrate
```

Also we need to create new keys for application and JWT plugin: 

```console
$ php artisan key:generate
$ php artisan jwt:secret
```

It will generate two keys in the .env file like this: 

```
APP_KEY=base64:YuhNVRdnq5uCUFUIO0wjAPz/RX0xbQ7HhvIvtnKHyU4=
JWT_SECRET=BHlyb2aGhEInsDDKHmqlu6jD6Nmbdks9DbLdE62Dxpry28zPNJQfkPYcd42g839c
```

If everything goes fine, you may use the serve option to serve the content to the browser

```console
$ php artisan serve
```

The page will ask you for registration. You may create a user using the "Register" option of the page. Then you may login using the user information you entered in the previous step.

#VueJS

First step is to install all dependencies using npm. 

```console
$ npm install
```

For runing vuejs project in development enviroment the command must be the next one: 

```console
$ npm run watch
```

ENJOY!
