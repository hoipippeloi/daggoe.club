List/Search (posts)
Fetch a paginated posts records list, supporting sorting and filtering.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

// fetch a paginated records list
const resultList = await pb.collection('posts').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('posts').getFullList({
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('posts').getFirstListItem('someField="test"', {
    expand: 'relField1,relField2.subRelField',
});
JavaScript SDK
API details
GET
/api/collections/posts/records

Query parameters
page	Number	The page (aka. offset) of the paginated list (default to 1).
perPage	Number	Specify the max returned records per page (default to 30).
sort	String	Specify the records order attribute(s).
Add - / + (default) in front of the attribute for DESC / ASC order. Ex.:
// DESC by created and ASC by id
?sort=-created,id
Supported record sort fields:
@random, id, created, updated, title, file, pinned, user

filter	String	Filter the returned records. Ex.:
?filter=(id='abc' && created>'2022-01-01')
expand	String	Auto expand record relations. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to each individual record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
skipTotal	Boolean	If it is set the total counts query will be skipped and the response fields totalItems and totalPages will have -1 value.
This could drastically speed up the search queries when the total counters are not needed or cursor based pagination is used.
For optimization purposes, it is set by default for the getFirstListItem() and getFullList() SDKs methods.
Responses
{
  "page": 1,
  "perPage": 30,
  "totalPages": 1,
  "totalItems": 2,
  "items": [
    {
      "id": "RECORD_ID",
      "collectionId": "lfe7h9sizskhc2a",
      "collectionName": "posts",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "file": "filename.jpg",
      "pinned": true,
      "user": "RELATION_RECORD_ID"
    },
    {
      "id": "RECORD_ID",
      "collectionId": "lfe7h9sizskhc2a",
      "collectionName": "posts",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "file": "filename.jpg",
      "pinned": true,
      "user": "RELATION_RECORD_ID"
    }
  ]
}

View (posts)
Fetch a single posts record.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

const record = await pb.collection('posts').getOne('RECORD_ID', {
    expand: 'relField1,relField2.subRelField',
});
JavaScript SDK
API details
GET
/api/collections/posts/records/:id

Path Parameters
id	String	ID of the record to view.
Query parameters
expand	String	Auto expand record relations. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "lfe7h9sizskhc2a",
  "collectionName": "posts",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "title": "test",
  "file": "filename.jpg",
  "pinned": true,
  "user": "RELATION_RECORD_ID"
}

Create (posts)
Create a new posts record.

Body parameters could be sent as application/json or multipart/form-data.

File upload is supported only via multipart/form-data.
For more info and examples you could check the detailed Files upload and handling docs .

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

// example create data
const data = {
    "title": "test",
    "pinned": true,
    "user": "RELATION_RECORD_ID"
};

const record = await pb.collection('posts').create(data);
JavaScript SDK
API details
POST
/api/collections/posts/records

Body Parameters
Optional
id
String	15 characters string to store as record ID.
If not set, it will be auto generated.
Optional
title
String	Plain text value.
Optional
file
File	File object.
Set to null to delete already uploaded file(s).
Optional
pinned
Boolean	
Optional
user
String	Relation record id.
Query parameters
expand	String	Auto expand relations when returning the created record. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "lfe7h9sizskhc2a",
  "collectionName": "posts",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "title": "test",
  "file": "filename.jpg",
  "pinned": true,
  "user": "RELATION_RECORD_ID"
}

Update (posts)
Update a single posts record.

Body parameters could be sent as application/json or multipart/form-data.

File upload is supported only via multipart/form-data.
For more info and examples you could check the detailed Files upload and handling docs .

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

// example update data
const data = {
    "title": "test",
    "pinned": true,
    "user": "RELATION_RECORD_ID"
};

const record = await pb.collection('posts').update('RECORD_ID', data);
JavaScript SDK
API details
PATCH
/api/collections/posts/records/:id

Path parameters
id	String	ID of the record to update.
Body Parameters
Optional
title
String	Plain text value.
Optional
file
File	File object.
Set to null to delete already uploaded file(s).
Optional
pinned
Boolean	
Optional
user
String	Relation record id.
Query parameters
expand	String	Auto expand relations when returning the updated record. Ex.:
?expand=relField1,relField2.subRelField21
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}). Only the relations that the user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "lfe7h9sizskhc2a",
  "collectionName": "posts",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "title": "test",
  "file": "filename.jpg",
  "pinned": true,
  "user": "RELATION_RECORD_ID"
}

Delete (posts)
Delete a single posts record.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

await pb.collection('posts').delete('RECORD_ID');
JavaScript SDK
API details
DELETE
/api/collections/posts/records/:id

Path parameters
id	String	ID of the record to delete.
Responses
null

Realtime (posts)
Subscribe to realtime changes via Server-Sent Events (SSE).

Events are sent for create, update and delete record operations (see "Event data format" section below).

You could subscribe to a single record or to an entire collection.

When you subscribe to a single record, the collection's ViewRule will be used to determine whether the subscriber has access to receive the event message.

When you subscribe to an entire collection, the collection's ListRule will be used to determine whether the subscriber has access to receive the event message.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://photoboard.pockethost.io');

...

// (Optionally) authenticate
await pb.collection('users').authWithPassword('test@example.com', '123456');

// Subscribe to changes in any posts record
pb.collection('posts').subscribe('*', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });

// Subscribe to changes only in the specified record
pb.collection('posts').subscribe('RECORD_ID', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });

// Unsubscribe
pb.collection('posts').unsubscribe('RECORD_ID'); // remove all 'RECORD_ID' subscriptions
pb.collection('posts').unsubscribe('*'); // remove all '*' topic subscriptions
pb.collection('posts').unsubscribe(); // remove all subscriptions in the collection
JavaScript SDK
API details
SSE
/api/realtime

Event data format
{
  "action": "create" // create, update or delete,
  "record": {
    "id": "RECORD_ID",
    "collectionId": "lfe7h9sizskhc2a",
    "collectionName": "posts",
    "created": "2022-01-01 01:00:00.123Z",
    "updated": "2022-01-01 23:59:59.456Z",
    "title": "test",
    "file": "filename.jpg",
    "pinned": true,
    "user": "RELATION_RECORD_ID"
  }
}