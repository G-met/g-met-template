# Patron Module Documentation

## Overview
The `patrones` module manages calibration patterns/standards used in metrology applications. It follows a domain-driven design pattern with separate layers for presentation, application, domain, and infrastructure.

## Current Structure
```
src/app/api/patrones/
├── (routes)/           # API route handlers
├── application/        # Application layer (use cases, DTOs)
├── dominio/           # Domain layer (entities, services, repositories interfaces)
├── dtos/              # Data Transfer Objects
├── infraestructure/   # Infrastructure layer (repositories implementations)
├── repositorio/       # Repository implementations
└── servicios/         # Business service logic
```

## Routes to Expose in Controller

### Main Endpoints
1. **POST** `/patrones` - Create new calibration pattern
2. **PUT** `/patrones/basicos` - Update basic pattern data
3. **GET** `/patrones` - List patterns with pagination and filtering
4. **GET** `/patrones/codigo/:codigo` - Get pattern by code
5. **GET** `/patrones/programados` - List programmed patterns

### Query Parameters
- `termino` - Search field (codigo, descripcion, modelo, serie)
- `valor` - Search value
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 5)

## Use Cases

### Write Use Cases
1. **CrearDatosBasicos** - Create basic pattern information
2. **EditarDatosBasicos** - Update basic pattern information
3. **CrearDatosComplementarios** - Create complementary pattern data
4. **EditarDatosComplementarios** - Update complementary pattern data
5. **CrearDatosMetrologicos** - Create metrological pattern data
6. **EditarDatosMetrologicos** - Update metrological pattern data
7. **CrearProgramacionPatron** - Create pattern programming schedule

### Read Use Cases
1. **ListarPatrones** - List all patterns with pagination
2. **ListarPatronesPorTermino** - Search patterns by specific terms
3. **ObtenerPatronPorCodigo** - Get pattern by code
4. **ListarPatronesProgramados** - List programmed patterns
5. **ObtenerPorCodigo** - Get pattern by code (alternative implementation)

## DTO (Data Transfer Objects)

### Input DTOs
1. **CrearPatronDto** - For creating new patterns
   - Properties: codigo, descripcion, modelo, serie, marcaId, ubicacionId, tipoPatronId, archivos (optional)

2. **EditarBasicosDto** - For updating basic pattern data
   - Properties: codigo, descripcion, modelo, serie, marcaId, ubicacionId

3. **CrearDatosComplementarios** - For creating complementary data
   - Properties: additional complementary fields

4. **CrearDatosMetrologicos** - For creating metrological data
   - Properties: metrological measurement fields

5. **CrearProgramationDto** - For creating programming schedules
   - Properties: scheduling and programming related fields

6. **EditarDatosComplementarios** - For updating complementary data
7. **EditarDatosMetrologicos** - For updating metrological data

### Output DTOs
1. **ObtenerPatronesOutput** - For listing patterns
2. **ListaProgramacionPatronesOutput** - For scheduling lists

## Business Rules

### Entity Validation Rules
1. **Uniqueness Constraint**: Pattern codes must be unique within a client scope
2. **Required Fields**: codigo, descripcion, modelo, serie are mandatory for basic pattern data
3. **Reference Integrity**: marca, ubicacion, tipoPatron must exist and be active
4. **File Constraints**: Document files cannot exceed 4MB total size
5. **Client Isolation**: All operations are scoped to the authenticated client

### State Management Rules
1. **Soft Deletion**: Patterns use fechaInactivacion instead of hard deletion
2. **Audit Trail**: Creation and update timestamps are automatically managed
3. **Inactivation Logic**: Pattern can only be inactivated if not currently assigned to active equipment

### Business Operations Rules
1. **Existence Validation**: Pattern must exist before any update operation
2. **Dependency Checks**: Related data integrity must be maintained
3. **File Management**: Automatic cleanup of associated files on pattern deletion
4. **Search Constraints**: Search operations are limited to client's own patterns

## Repository Schemas

### Entity Properties
```properties
PatronEntity:
- id: string (primary key)
- codigo: string (unique within client)
- descripcion: string
- modelo: string
- serie: string
- marca: Reference to Marca entity
- ubicacion: Reference to Ubicacion entity
- cliente: Reference to Cliente entity
- tipoPatron: Reference to TipoPatron entity
- documentos: Array of Document references
- datosMetrologicos: Optional metrological data
- datosComplementarios: Optional complementary data
- fechaCreacion: Date
- fechaActualizacion: Date
- fechaInactivacion: Optional Date (for soft delete)
```

### Repository Interfaces

#### Read Repository Operations
1. **obtenerPorID** - Find pattern by ID and client
2. **obtenerPorCodigo** - Find pattern by code and client
3. **listarPatrones** - List patterns with pagination
4. **listarPatronesPorTermino** - Search patterns by term with pagination
5. **verificarExistePorId** - Check if pattern exists by ID
6. **obtenerPatrones** - Generic pattern retrieval method
7. **obtenerPatronPorCodigo** - Alternative pattern retrieval by code

#### Write Repository Operations
1. **crearDatosBasicos** - Create basic pattern data
2. **editarDatosBasicos** - Update basic pattern data
3. **crearDatosComplementarios** - Create complementary data
4. **editarDatosComplementarios** - Update complementary data
5. **crearDatosMetrologicos** - Create metrological data
6. **editarDatosMetrologicos** - Update metrological data
7. **inactivarPatron** - Soft delete pattern

### Database Relationships
1. **Many-to-One**: Patron → Marca
2. **Many-to-One**: Patron → Ubicacion
3. **Many-to-One**: Patron → Cliente
4. **Many-to-One**: Patron → TipoPatron
5. **One-to-Many**: Patron → Documentos (file attachments)

### Indexing Recommendations
1. **Client Isolation Index**: (clienteId, activo)
2. **Unique Constraints**: (clienteId, codigo)
3. **Search Optimizations**: Text indexes on searchable fields
4. **Composite Indexes**: For common query patterns

## File Structure Mapping

### Current Implementation Files

#### Routes Layer
- `src/app/api/patrones/(routes)/route.ts` - Main API handler

#### Application Layer
- `application/use-cases/read/listarPatrones.ts`
- `application/use-cases/read/listarPatronesPorTermino.ts`
- `application/use-cases/write/crearDatosBasicos.ts`
- `application/dto/crearPatrones.ts`
- `application/dto/obtenerPatrones.ts`

#### Domain Layer
- `dominio/entity/intex.ts` - PatronEntity definition
- `dominio/service/index.ts` - Domain services
- `dominio/repository/index.ts` - Repository interfaces
- `dominio/errors/index.ts` - Domain errors

#### Data Layer
- `dtos/editarBasicos.dto.ts`
- `dtos/crearDatosComplementarios.dto.ts`
- `dtos/crearDatosMetrologicos.ts`
- `dtos/editarDatosComplementarios.dto.ts`
- `dtos/editarDatosMetrologicos.dto.ts`
- `dtos/crearProgramation.dto.ts`
- `dtos/listaProgramacionPatrones.output.ts`
- `dtos/obtenerPatrones.dto.output.ts`

#### Infrastructure Layer
- `infraestructure/repository/read/index.ts`
- `infraestructure/repository/write/PatronRepositoryWriteImpl.ts`

#### Services Layer
- `servicios/crearPatron.ts`
- `servicios/editarDatosBasicos.ts`
- `servicios/crearDatosComplementarios.ts`
- `servicios/editarDatosComplementarios.ts`
- `servicios/crearDatosMetrologicos.ts`
- `servicios/editarDatosMetrologicos.ts`
- `servicios/crearProgramacionPatron.ts`
- `servicios/listarPatronesProgramados.ts`
- `servicios/obtenerPatrones.ts`
- `servicios/obtenerPatronPorCodigo.ts`
- `servicios/ObtenerPorCodigo.ts`
- `servicios/validarPatronExiste.ts`

#### Repository Layer
- `repositorio/index.ts`
- `repositorio/patronRepositorio.ts`

