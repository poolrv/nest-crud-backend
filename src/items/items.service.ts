import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = []; // Almacenamiento en memoria

  // Obtener todos los elementos
  findAll(): Item[] {
    return this.items;
  }

  // Obtener un elemento por ID
  findOne(id: number): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }
    return item;
  }

  // Crear un nuevo elemento
  create(createItemDto: CreateItemDto): Item {
    const newItem = {
      id: this.items.length ? this.items[this.items.length - 1].id + 1 : 1,
      ...createItemDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  // Actualizar un elemento por ID
  update(id: number, updateItemDto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, updateItemDto, { updatedAt: new Date() });
    return item;
  }

  // Eliminar un elemento por ID
  remove(id: number): void {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item con ID ${id} no encontrado`);
    }
    this.items.splice(index, 1);
  }
}
