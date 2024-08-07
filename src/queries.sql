create table pendingUsers(
    pid serial primary key,
    ename text unique not null,
    email text unique not null
);


create table authentication(
    eid int not null primary key,
    password text not null
);

create table employee(
    eid serial primary key,
    ename text unique not null,
    email text unique not null,
    phone text,
    role text,
    doj  date
);

create table manager(
    mid int not null primary key,
    ename text unique not null,
    email text unique not null,
    phone text
);

create table owner(
    oid int not null primary key,
    ename text unique not null,
    email text unique not null,
    phone text
);


create table checkin(
    eid int not null,
    date date,
    time time,
    checkedin boolean not null,
    primary key(eid, date, time)
)


create table checkout(
    eid int not null,
    date date,
    time time,
    checkedout boolean not null,
    primary key(eid, date, time)
)
    